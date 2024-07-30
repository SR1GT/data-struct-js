class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
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

  contains(value) {
    if (!this.root) return false;

    let temp = this.root;
    while (true) {
      if (temp.value === value) return true;
      else if (temp.value > value) {
        if (!temp.left) return false;
        temp = temp.left;
      } else {
        if (!temp.right) return false;
        temp = temp.right;
      }
    }
  }

  minValueNode() {
    let temp = this.root;
    while (temp.left) temp = temp.left;
    return temp;
  }
}
