const mongoose = require("mongoose");
const router = require("express").Router();
const auth = require("../auth");
const apiUtil = require("../../util/apiUtil");

const Users = mongoose.model("Users");

router.post("/getUser", auth.optional, (req, res) => {
  const { searchKey } = req.body;
  Users.find({ username: { $regex: `.*${searchKey}.*` } })
    .then((users) => res.send(users))
    .catch((err) => res.send(apiUtil.getErrorObject(err, "Not able to fetch users")));
});
module.exports = router;
