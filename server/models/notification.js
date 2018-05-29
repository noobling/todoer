const mongoose = require("mongoose");

let NotificationSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  route: {
    type: String,
    required: true
  },
  forUser: {
    type: mongoose.Schema.ObjectId,
    required: true
  },
  read: {
    type: Boolean,
    default: false
  }
});

let Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;
