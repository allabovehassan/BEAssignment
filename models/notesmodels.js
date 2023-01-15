const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: String,
  note: String,
  category: String,
  userID: String,
}, {
    versionKey:false
});

const notemodel = mongoose.model("Notes", schema);

module.exports = { notemodel };
