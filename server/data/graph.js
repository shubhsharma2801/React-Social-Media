/* eslint-disable no-restricted-syntax */
class Graph {
  constructor() {
    this.nodes = {};
  }

  addVertex(vertex) {
    if (!this.nodes[vertex]) {
      this.nodes[vertex] = [];
    }
  }

  addEdge(source, destination) {
    if (!this.nodes[source]) {
      this.addVertex(source);
    }
    if (!this.nodes[destination]) {
      this.addVertex(destination);
    }
    this.nodes[source].push(destination);
  }

  removeEdge(source, destination) {
    this.nodes[source] = this.nodes[source].filter(
      (vertex) => vertex !== destination
    );
  }

  findFollowerFollowing(source) {
    const context = {};
    context.follower = [];
    context.following = [];
    if (this.nodes[source]) {
      context.following = this.nodes[source];
    }
    console.log('0000000',this.nodes);
    for (const [key, value] of Object.entries(this.nodes)) {
      if (value.includes(source)) {
        context.follower.push(key);
      }
    }
    return context;
  }
}
module.exports = Graph;
