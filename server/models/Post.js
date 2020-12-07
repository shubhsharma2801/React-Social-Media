const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  image: {
    type: Object,
  },
  description: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: String,
  },
});

mongoose.model("Post", PostSchema);
