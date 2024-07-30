class Digraph {
  constructor() {
    this.adjacencyList = new Object();
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
      return this;
    }
    throw new Error("Vertex already exists");
  }

  addEdge(vertexFrom, vertexTo) {
    if (this.adjacencyList[vertexFrom] && this.adjacencyList[vertexTo]) {
      this.adjacencyList[vertexFrom].push(vertexTo);
      return this;
    }
    throw new Error("Vertex not found");
  }

  removeEdge(vertexFrom, vertexTo) {
    if (this.adjacencyList[vertexFrom] && this.adjacencyList[vertexTo]) {
      this.adjacencyList[vertexFrom] = this.adjacencyList[vertexFrom].filter(
        (vertex) => vertex != vertexTo
      );
      return this;
    }
    throw new Error("Vertex not found");
  }

  removeVertex(vertex) {
    if (this.adjacencyList[vertex]) {
      Object.keys(this.adjacencyList).forEach((key) => {
        this.removeEdge(key, vertex);
      });
      delete this.adjacencyList[vertex];
      return this;
    }
    throw new Error("Vertex not found");
  }
}
