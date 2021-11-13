const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// ('api/post')

// View posts


// Create post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost)
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update post
router.put('/:id', async (req, res) => {
  try {
      const commentData = await Post.update(
        {
          ...req.body,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json({
        commentData,
        message: "Post updated"
      });
  } catch (err) {
      res.status(500).json(err);
  }
})

// Delete post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id." });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;