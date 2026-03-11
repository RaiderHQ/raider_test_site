const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const users = require('./data/users.json');
const products = require('./data/products.json');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'raider-test-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 60 * 1000 }
}));

// Make user session available to all views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Home page
app.get('/', (req, res) => {
  res.render('home', { products });
});

// Login page — matches automationteststore.com route
app.get('/index.php', (req, res) => {
  const rt = req.query.rt;

  if (rt === 'account/login') {
    if (req.session.user) {
      return res.redirect('/index.php?rt=account/account');
    }
    return res.render('login', { error: null });
  }

  if (rt === 'account/account') {
    if (!req.session.user) {
      return res.redirect('/index.php?rt=account/login');
    }
    return res.render('account');
  }

  if (rt === 'account/logout') {
    req.session.destroy();
    return res.redirect('/');
  }

  res.redirect('/');
});

// Login POST handler
app.post('/index.php', (req, res) => {
  const body = req.body || {};
  const loginname = body.loginname;
  const password = body.password;
  const user = users.find(u => u.username === loginname && u.password === password);

  if (user) {
    req.session.user = { username: user.username, name: user.name };
    return res.redirect('/index.php?rt=account/account');
  }

  res.render('login', { error: 'Error: Incorrect login or password provided.' });
});

// Product detail page
app.get('/product/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).render('404');
  }
  res.render('product', { product });
});

app.listen(PORT, () => {
  console.log(`Raider Test Site running on http://localhost:${PORT}`);
});
