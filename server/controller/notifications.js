const Notification = require("../models/notification");
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "533304",
  key: "779f9709b78f6c1b0f60",
  secret: "a57fc77fa89e3e8a7a0f",
  cluster: "ap1",
  encrypted: true
});

module.exports.store = data => {
  const notification = new Notification();
  notification.route = data.route;
  notification.message = data.message;
  notification.forUser = data.forUser;
  notification.save().then(newNotification => {
    pusher.trigger(data.forUser, "new-notification");
  });
};

module.exports.read = (req, res) => {
  Notification.update({_id: req.params.notificationId}, {read: true}, (err, result) => {
    res.json({message: 'Read notification'})
  })
}

module.exports.index = (req, res) => {
  Notification.find({$and: [{forUser: req.user.id}, {read: false}]})
    .then(notifications => res.json(notifications))
}