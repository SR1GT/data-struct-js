class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let temp = this.root;
    while (true) {
      if (temp.value === value) return undefined;
      else if (temp.value > value) {
        if (!temp.left) {
          temp.left = newNode;
          return this;
        }
        temp = temp.left;
      } else {
        if (!temp.right) {
          temp.right = newNode;
          return this;
        }
        temp = temp.right;
      }
    }
  }

  DFS(order) {
    let result = [];
    const expression = [
      (node) => result.push(node.value),
      (node) => {
        if (node.left) traverse(node.left);
      },
      (node) => {
        if (node.right) traverse(node.right);
      },
    ];
    const traverse = (node) => {
      order.forEach((item) => {
        expression[item](node);
      });
    };
    traverse(this.root);
    return result;
  }
}

var myTree = new Tree();
myTree.insert(20);
myTree.insert(15);
myTree.insert(4);
myTree.insert(19);
myTree.insert(26);
myTree.insert(22);
myTree.insert(102);

const Order = Object.freeze({
  PRE: [0, 1, 2],
  IN: [1, 0, 2],
  POST: [1, 2, 0],
});
console.log(myTree.DFS(Order.PRE));
console.log(myTree.DFS(Order.IN));
console.log(myTree.DFS(Order.POST));
