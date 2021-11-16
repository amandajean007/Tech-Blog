const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [{ model: User }],
    });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/create-blog', withAuth, async (req, res) => {
  try {
    res.render('create-blog', {
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blogs/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['username'],
            },
          ],
          attributes: ['id', 'details', 'date_created', 'user_id'],
        },
      ],
    });
    const blog = blogData.get({ plain: true });
    for (let i = 0; i < blog; i++) {
      const isMatch = blog.comments[i].user_id === req.session.user_id;
      blog.comments[i].isUser = isMatch;
    }
    res.render('blog', {
      ...blog,
      logged_in: req.session.logged_in,
      current_user: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blogs/edit/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id);
    const blogPost = blogData.get({ plain: true });

    res.render('blog-edit', {
      ...blogPost,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;