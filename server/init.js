const mongoose = require("mongoose");
const Graph = require("./data/graph");

const followerGraph = new Graph();
const Follower = mongoose.model("Follower");
const createGraphOfAllUser = () => {
  const stream = Follower.find().stream();
  stream.on("data", (doc) => {
    stream.pause();
    followerGraph.addEdge(doc.follower, doc.following);
    stream.resume();
  });
  stream.on("close", () => {
    console.log(followerGraph);
  });
};

module.exports = {
  createGraphOfAllUser,
  followerGraph
};
