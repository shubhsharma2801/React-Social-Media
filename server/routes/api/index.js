const express = require("express");

const router = express.Router();
const users = require("./users");
const post = require("./post");
const profile = require("./profile");

router.use("/users", users);
router.use("/post", post);
router.use("/profile", profile);
module.exports = router;
