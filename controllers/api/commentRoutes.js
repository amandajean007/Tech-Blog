const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// ('/api/comment/')

// Post a comment
router.post('/', withAuth, async (req, res) => {
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

// Get all comments
router.get('/', withAuth, async (req, res) => {
try {
    const commentData = await Comment.findAll();
    if (!commentData) {
        res.status(404).json({message: 'No comments found'});
        return;
    }
    res.status(200).json(commentData);
} catch (err) {
    res.status(500).json(err);
}
});

module.exports = router;