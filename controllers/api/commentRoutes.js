const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// ('/api/comment/')

// Get all comments
// router.get('/', withAuth, async (req, res) => {
//     console.log("is anyone out there?");
// try {
//     const commentData = await Comment.findAll();
//     if (!commentData) {
//         res.status(404).json({message: 'No comments found'});
//         return;
//     }
//     res.status(200).json(commentData);
    
// } catch (err) {
//     res.status(500).json(err);
//     console.log("or over here?");
// }
// });

module.exports = router;