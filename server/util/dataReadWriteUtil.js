const mongoose = require("mongoose");
const fs = require("fs");

const Post = mongoose.model("Post");

const fetchPostByQuery = (query) => new Promise((resolve, reject) => {
  Post.find(query)
    .populate({ path: "author" })
    .sort({ _id: -1 })
    .lean()
    .then((posts) => resolve(posts))
    .catch((err) => reject(err));
});

const fetchDocumentImagePromisified = (document, imageField) => new Promise((resolve, reject) => {
  fs.readFile(
    `${document[imageField].destination}/${document[imageField].filename}`,
    (err, data) => {
      console.log(err);
      if (err) return reject(err);
      const resultDocument = { ...document };
      const str = data.toString("base64");
      resultDocument.imageData = str;
      return resolve(resultDocument);
    }
  );
});

module.exports = {
  fetchPostByQuery,
  fetchDocumentImagePromisified,
};
