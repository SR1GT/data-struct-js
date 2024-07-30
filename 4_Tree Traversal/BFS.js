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

  BFS() {
    let temp = this.root,
      queue = [],
      result = [];
    queue.push(temp);
    while (queue.length) {
      temp = queue.shift();
      result.push(temp.value);
      if (temp.left) queue.push(temp.left);
      if (temp.right) queue.push(temp.right);
    }
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
console.log(myTree.BFS());
