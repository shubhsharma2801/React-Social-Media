const mongoose = require("mongoose");

const FollowerSchema = mongoose.Schema({
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  following: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

mongoose.model("Follower", FollowerSchema);
