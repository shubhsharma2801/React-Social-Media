const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const router = require("express").Router();
const auth = require("../auth");

const Users = mongoose.model("Users");
const dataReadWriteUtil = require("../../util/dataReadWriteUtil");

const storage = multer.diskStorage({
  destination: "./public/profilePicture",
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, `IMAGE-${Date.now()}${path.extname(file.originalname)}.jpeg`);
  },
});
const upload = multer({
  storage,
}).single("profileImage");

router.post("/uploadProfilePic", auth.required, (req, res) => {
  upload(req, res, () => {
    const { userId } = req.body;
    Users.findByIdAndUpdate(
      userId,
      { profilePicture: req.file },
      { new: true },
      (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(`RESULT: ${result}`);
        res.send({ message: "uploaded successfully" });
      }
    );
  });
});

router.post("/fetchProfile", auth.required, (req, res) => {
  const profile = {};
  const { author } = req.body;
  const query = {
    author,
  };
  dataReadWriteUtil
    .fetchPostByQuery(query)
    .then((posts) => {
      const promiseArray = posts.map((post) => dataReadWriteUtil.fetchDocumentImagePromisified(post, "image"));
      return Promise.all(promiseArray);
    })
    .then((result) => {
      Users.findById(author)
        .lean()
        .then((user) => {
          dataReadWriteUtil
            .fetchDocumentImagePromisified(user, "profilePicture")
            .then((user) => {
              profile.user = user;
              profile.posts = result;
              res.send(profile);
            });
        });
    })
    .catch((err) => res.send({ message: `Error while fecthing post ${JSON.stringify(err)}` }));
});
module.exports = router;
