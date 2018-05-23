const User = require("../models/user");
const passport = require("passport");

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
          console.log(err);
          res.status(400).json(err);
        } else {
          res.json(savedUser);
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

module.exports.login = (req, res, next) => {
  // const prevPage = req.header('Referer') || '/';
  passport.authenticate("local", (err, user) => {
    if (err) {
      res.status(400).json(err);
      return;
    }

    if (!user) {
      console.log("no user");
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

module.exports.loggedInUser = (req, res) => {
  res.json(req.user);
};

module.exports.index = (req, res) => {
  User.find({}, (err, users) => {
    res.json(users);
  });
};

module.exports.show = (req, res) => {
  User.findById(req.params.userId, "email name", (err, user) => {
    res.json(user);
  });
};
