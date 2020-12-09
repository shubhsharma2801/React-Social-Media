/* eslint-disable no-param-reassign */
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = require("express").Router();
const auth = require("../auth");

const Post = mongoose.model("Post");
const dataReadWriteUtil = require("../../util/dataReadWriteUtil");

const storage = multer.diskStorage({
  destination: "./public",
  filename: (req, file, cb) => {
    cb(null, `IMAGE-${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({
  storage,
}).single("postImage");

router.post("/upload", auth.required, (req, res) => {
  upload(req, res, () => {
    const post = new Post();
    const { userID, postDescription } = req.body;
    post.author = userID;
    post.image = req.file;
    post.description = postDescription;
    post.save().then(() => {
      res.send({ message: "uploaded successfully" });
    });
  });
});

router.post("/fetchPost", auth.required, (req, res) => {
  const { author } = req.body;
  const query = {
    author,
  };
  Post.find(query)
    .populate({ path: "author" })
    .sort({ _id: -1 })
    .lean()
    .then((posts) => {
      const promiseArray = posts.map((post) => dataReadWriteUtil.fetchDocumentImagePromisified(post, "image"));
      return Promise.all(promiseArray);
    })
    .then((result) => res.send(result))
    .catch((err) => {
      res.send({ message: `Error while fecthing post ${JSON.stringify(err)}` });
    });
});

module.exports = router;
