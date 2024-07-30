class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor(value) {
    this.first = new Node(value);
    this.last = this.first;
    this.length = 1;
  }

  enQueue(value) {
    const newNode = new Node(value);
    if (!this.first) {
      this.first = newNode;
      this.last = this.first;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }
    this.length++;
    return this;
  }

  deQueue() {
    if (!this.first) return undefined;
    let temp = this.first;
    this.first = this.first.next;
    temp.next = null;
    this.length--;
    if (this.length === 0) this.first = this.last = null;
    return temp;
  }
}
