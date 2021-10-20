const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// ('api/post')

// Gets all posts
router.get('/', async (req, res) => {
  try {
      const commentData = await Post.findAll();
      if (!commentData) {
          res.status(404).json({message: 'No post data found'});
          return;
      }
      res.status(200).json(commentData);
  } catch (err) {
      res.status(500).json(err);
  }
});

// Create post
router.post('/', withAuth, async (req, res) => {
  try {
    console.log("line 10 postRoutes / create a post");
    const newPost = await Post.create({
      ...req.body,
        user_id: req.session.user_id,
    });
    res.status(200).json(newPost)
    console.log(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    await Post.destroy({
      where: {
        id: req.params.id,
      }
    })
    res.status(200).json({
      message: 'Post Deleted'
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update post
router.put('/:id', async (req, res) => {
  try {
      req.body.user_id = req.session.user_id;
      const commentData = await Post.update(
        req.body, {
          where: {
            id: req.params.id
          }
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

// Post a comment
router.post('/:id/comment', withAuth, async (req, res) => {
  console.log("this route works to post a comment");
  try {
  //   req.body.user_id = req.session.user_id;
      const newComment = await Comment.create({
          ...req.body,
          user_id: req.session.user_id,
      });
      res.status(200).json({ newComment, message:"Comment sucessfully created."})
  } catch (err) {
    res.status(500).json(err);
    console.log('post comment error');
  }
});







module.exports = router;