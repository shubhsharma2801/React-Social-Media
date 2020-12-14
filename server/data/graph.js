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
}
module.exports = Graph;
