const User = require("../models/user");
const passport = require("passport");

module.exports.register = (req, res) => {
  const user = new User();
  user.email = req.body.email;
  user.setPassword(req.body.password);
  user.save().then(savedUser => {
    req.login(savedUser, err => {
      if (err) {
        console.log(err)
        next(err);
        return;
      } else {
        res.json(savedUser)
      }
    });
  })
  .catch((err) => {
    console.log(err)
  });
};

module.exports.login = (req, res, next) => {
  // const prevPage = req.header('Referer') || '/';
  passport.authenticate("local", (err, user) => {
    if (err) {
      next(err);
    }

    if (!user) {
      console.log("no user");
      res.render("index", { errors: ["Incorrect credentials"] });
      return;
    }
    req.logIn(user, err2 => {
      if (err2) {
        next(err);
      }
      if (req.body.lengthOfStay) {
        res.redirect(307, "/locations/".concat(req.body.lengthOfStay)); // show vacancies
      }
      res.redirect("/admin");
    });
  })(req, res, next);
};
