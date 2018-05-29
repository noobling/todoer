const mongoose = require("mongoose");

let dbURI = process.env.db_url;

// Using `mongoose.connect`...
mongoose.connect(dbURI);

mongoose.connection.on("connected", () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on("error", err => {
  console.log(`Mongoose connection error ${err}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

function gracefulShutdown(msg, callback) {
  console.log(`Mongoose disconnected through ${msg}`);
  callback();
}

process.once("SIGUSR2", () => {
  gracefulShutdown("nodemon shutdown", () => {
    process.kill(process.pid, "SIGUSR2");
  });
});

process.on("SIGINT", () => {
  gracefulShutdown("app shutdown", () => {
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  gracefulShutdown("heroku app shutdown", () => {
    process.exit(0);
  });
});

require("./user");
require("./todoList");
require("./todoItem");
require("./todoItemChat");
require("./notification");
