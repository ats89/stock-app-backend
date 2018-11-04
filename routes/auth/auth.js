const router = require('express').Router();
const passport = require('passport');
const jwt = require('../../config/jwt');
const { User } = require('../../models');

require('../../config/passport');

router.post('/signup', (req, res) => {
  (async () => {
    const { username, email, password } = req.body;
    let user;

    user = await User.findOne({ where: { username: username } });

    if (user) {
      return res.json({ error: { username: 'Username already taken.'} });
    } else {
      user = await User.findOne({ where: { email: email } });
    }
    
    if (user) {
      return res.json({ error: { email: 'User with this email already exists.'} });
    } 
   
    try {
      const newUser = await User.create({
        username: username,
        email: email,
        password: password,
      });
      return res.json({accessToken: jwt.createToken(newUser)});
    } catch (e) {
      return res.json({ error: e.errors });
    }
  })();
});

router.post('/login', (req, res) => {
  (async () => {
    const { usernameOrEmail, password } = req.body;
    let user;

    if (/@/.test(usernameOrEmail)) {
      user = await User.findOne({ where: { email: usernameOrEmail }});
    } else {
      user = await User.findOne({ where: { username: usernameOrEmail }});
    }
   
    if (!user) return res.json({error: { usernameOrEmail: 'Could not find user.'}});

    if (user.validPassword(password)) {
      return res.json({accessToken: jwt.createToken(user)});
    } else {
      return res.json({ error: { password: 'Invalid Password.'}});
    }
  })();
});

router.get('/user', passport.authenticate('auth-user', {session: false}), (req, res) => {
  User.findOne({
    where: {
      username: req.user.id,
    }
  }).then(result => {
    res.json({authenticated: true});
  });
});

module.exports = router;