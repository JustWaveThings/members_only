const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const MessageSchema = new Schema({
  title: { type: String, required: true, max: 100 },
  message: { type: String, required: true },
  timestamp: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

MessageSchema.virtual("timestamp_formatted").get(function () {
  return this.timestamp
    ? DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATE_MED)
    : "";
});

module.exports = mongoose.model("Message", MessageSchema);
