const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const router = require("express").Router();
const auth = require("../auth");

const Users = mongoose.model("Users");
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
      { profilePic: req.file },
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

module.exports = router;
