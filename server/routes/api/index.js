const express = require("express");

const router = express.Router();
const users = require("./users");
const post = require("./post");
const profile = require("./profile");
const search = require("./search");

router.use("/users", users);
router.use("/post", post);
router.use("/profile", profile);
router.use("/search", search);
module.exports = router;
