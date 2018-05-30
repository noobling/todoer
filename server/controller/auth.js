const passport = require("passport");
const User = require("../models/user");

module.exports.logout = (req, res) => {
  req.logout();
  res.json("");
};

module.exports.register = (req, res) => {
  const user = new User();
  user.email = req.body.email;
  user.name = req.body.name;
  user.skills = req.body.skills;
  user.setPassword(req.body.password);
  user
    .save()
    .then(savedUser => {
      req.login(savedUser, err => {
        if (err) {
          res.status(400).json(err);
        } else {
          res.json(savedUser);
        }
      });
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

module.exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      res.status(400).json(err);
      return;
    }

    if (!user) {
      res.status(400).json("Invalid credentials");
      return;
    }
    req.logIn(user, err2 => {
      if (err2) {
        res.status(400).json(err2);
        return;
      }

      res.json(user);
    });
  })(req, res, next);
};
