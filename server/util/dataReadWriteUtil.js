const mongoose = require("mongoose");
const fs = require("fs");
const { rejects } = require("assert");

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
  if (document[imageField]) {
    fs.readFile(
      `${document[imageField].destination}/${document[imageField].filename}`,
      (err, data) => {
        console.log(data);
        if (err) {
          return reject(err);
        }
        const resultDocument = { ...document };
        const str = data.toString("base64");
        resultDocument.imageData = str;
        return resolve(resultDocument);
      }
    );
  } else {
    return resolve(document);
  }
});

module.exports = {
  fetchPostByQuery,
  fetchDocumentImagePromisified,
};
