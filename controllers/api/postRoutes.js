const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// ('api/post')

// create a post
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

// comment on a post
// router.post('/post/:id', withAuth, async (req, res) => {
//   try {
//     const 
//   }
// })

// Delete post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
