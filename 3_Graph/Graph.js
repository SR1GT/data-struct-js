class Graph {
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

  addEdge(vertex1, vertex2) {
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex1].push(vertex2);
      this.adjacencyList[vertex2].push(vertex1);
      return this;
    }
    throw new Error("Vertex not found");
  }

  removeEdge(vertex1, vertex2) {
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
        (vertex) => vertex != vertex2
      );
      this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
        (vertex) => vertex != vertex1
      );
      return this;
    }
    throw new Error("Vertex not found");
  }

  removeVertex(vertex) {
    if (this.adjacencyList[vertex]) {
      this.adjacencyList[vertex].forEach((item) => {
        this.removeEdge(vertex, item);
      });
      delete this.adjacencyList[vertex];
      return this;
    }
    throw new Error("Vertex not found");
  }
}
