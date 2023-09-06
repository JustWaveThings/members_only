const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, max: 100 },
  password: { type: String, required: true },
  firstName: { type: String, required: true, max: 100 },
  lastName: { type: String, required: true, max: 100 },
  memberStatus: {
    type: String,
    required: true,
    enum: ["non-member", "member", "admin"],
    default: "non-member",
  },
});

// Virtual for user's full name
UserSchema.virtual("name").get(function () {
  return this.firstName + " " + this.lastName;
});

module.exports = mongoose.model("Users", UserSchema);
