const mongoose = require("mongoose");
const userSch =  new mongoose.Schema({
  name: { type: String, require: false },
  email: { type: String, require: false },
  password: { type: String, require: false },
});
const userSchema = mongoose.model("user", userSch);
module.exports = userSchema;
