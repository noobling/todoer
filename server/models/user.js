let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");

let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
});

UserSchema.plugin(passportLocalMongoose);
  

let User = mongoose.model("User", UserSchema);

module.exports = User;
