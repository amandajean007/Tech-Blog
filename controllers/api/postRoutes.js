const router = require('express').Router();
const { Post, Comment, } = require('../../models');
const withAuth = require('../../utils/auth');

// ('api/post')

// Gets all posts
router.get('/', async (req, res) => {
  try {
      const postData = await Post.findAll();
      if (!postData) {
          res.status(404).json({message: 'No post data found'});
          return;
      }
      res.status(200).json(postData);
  } catch (err) {
      res.status(500).json(err);
  }
});

// Create post
router.post('/', withAuth, async (req, res) => {
  try {
    console.log("line 24 postRoutes / create a post");
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

// Gets all comments
router.get('/:id/comment', async (req, res) => {
  console.log("this works");
  try {
      const commentData = await Comment.findAll();
      if (!commentData) {
          res.status(404).json({message: 'No comment data found'});
          return;
      }
      res.status(200).json(commentData);
  } catch (err) {
      res.status(500).json(err);
  }
});

// Create comment
router.post('/:id', withAuth, async (req, res) => {
  try {
    console.log("line 39 create a comment");
    const newComment = await Comment.create({
      ...req.body,
        user_id: req.session.user_id,
    });
    res.status(200).json(newComment)
    console.log(newComment);
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

module.exports = router;