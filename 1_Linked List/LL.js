class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor(value) {
    this.head = new Node(value);
    this.tail = this.head;
    this.length = 1;
  }

  forEach(callback) {
    if (!this.head) return;
    let temp = this.head;
    while (temp) {
      callback(temp);
      temp = temp.next;
    }
  }

  push(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }

  pop() {
    if (!this.head) return undefined;

    let prev = this.head;
    let temp = this.head;
    while (temp.next) {
      prev = temp;
      temp = temp.next;
    }
    this.tail = prev;
    this.tail.next = null;
    this.length--;

    if (this.length === 0) this.head = this.tail = null;
    return temp;
  }

  unshift(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }

  shift() {
    if (!this.head) return undefined;

    let temp = this.head;
    this.head = this.head.next;
    temp.next = null;
    this.length--;

    if (this.length === 0) this.tail = null;
    return temp;
  }

  get(index) {
    if (index === 0) return this.head;
    if (index < this.length * -1 || index >= this.length)
      throw new Error("Index out of bounds");
    if (index < 0) index = this.length + index;
    let temp = this.head;
    for (let i = 0; i < index; i++) temp = temp.next;
    return temp;
  }

  set(index, value) {
    let temp = this.get(index);
    temp.value = value;
    return temp;
  }

  insert(index, value) {
    if (index === 0) return this.unshift(value);
    if (index === this.length) return this.push(value);
    if (index < 0 || index > this.length)
      throw new Error("Index out of bounds");

    let newNode = new Node(value);
    let prev = this.get(index - 1);
    newNode.next = prev.next;
    prev.next = newNode;
    this.length++;
    return this;
  }

  remove(index) {
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();
    if (index < 0 || index >= this.length)
      throw new Error("Index out of bounds");

    let prev = this.get(index - 1);
    let temp = prev.next;
    prev.next = temp.next;
    temp.next = null;
    this.length--;
    return temp;
  }

  reverse() {
    let temp = this.head;
    let next = temp.next,
      prev = null;

    [this.head, this.tail] = [this.tail, this.head];
    for (let i = 0; i < this.length; i++) {
      next = temp.next;
      temp.next = prev;
      prev = temp;
      temp = next;
    }
    return this;
  }
}
