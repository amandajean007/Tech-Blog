const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// ('/')

// homepage - Get all Posts and JOIN with user data
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        }
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.redirect('/login');
  }
});

// find post by id
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Find the logged in user based on the session ID
router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Log in and Sign up
// If the user is already logged in, redirect the request to another route
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    // res.redirect('/profile');
    return;
  }
  res.render('login');
});

// Get all comments
router.get('/comment', withAuth, async (req, res) => {
  try {
    console.log("hello!");
    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        }
      ],
    });

    // Serialize data so the template can read it
    const comments = commentData.map((post) => post.get({ plain: true }));
    console.log("homeRoutes line 102 'comments': ", comments);
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      comments, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.redirect('/login');
  }
});








module.exports = router;
