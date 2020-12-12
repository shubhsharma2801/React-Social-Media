/* eslint-disable max-len */
const mongoose = require("mongoose");
const router = require("express").Router();
const auth = require("../auth");
const apiUtil = require("../../util/apiUtil");
const dataReadWriteUtil = require("../../util/dataReadWriteUtil");

const Users = mongoose.model("Users");

router.post("/getUser", auth.optional, (req, res) => {
  const { searchKey } = req.body;
  Users.find({ username: { $regex: `.*${searchKey}.*` } })
    .lean()
    .then((users) => Promise.all(
      users.map((user) => dataReadWriteUtil.fetchDocumentImagePromisified(
        user,
        "profilePicture"
      ))
    ))
    .then((result) => res.send(result))
    .catch((err) => res.send(apiUtil.getErrorObject(err, "Not able to fetch users")));
});
module.exports = router;
