const User = require("../models/user");

module.exports.register = (req, res) => {
  console.log(req.body);
  User.register(
    new User({
      username: req.body.username,
      email: req.body.email
    }),
    req.body.password,
    function(err, user) {
      if (err) {
        res.json(err);
      } else {
        res.json(user);
      }
    }
  );
};

module.exports.login = (req, res) => {
  User.authenticate()(
    req.body.username,
    req.body.password,
    (err, user, options) => {
      console.log(user)
      res.json('/')
      // if (err) res.json(err);
      // else if (user === false) {
      //   res.json("Username and password don't match");
      // } else {
      //   req.login(user, function(err) {
      //     if (err) res.json(err);
      //     else {
      //       res.json(user);
      //       return;
      //     }
      //   });
      // }
    }
  );
};
