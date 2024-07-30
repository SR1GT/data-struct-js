class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
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
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }

  pop() {
    if (!this.head) return undefined;

    let temp = this.tail;
    this.tail = this.tail.prev;
    this.tail.next = null;
    temp.prev = null;
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
      this.head.prev = newNode;
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
    this.head.prev = null;
    temp.next = null;
    this.length--;

    if (this.length === 0) this.tail = null;
    return temp;
  }

  get(index) {
    if (index === 0) return this.head;
    if (index === this.length - 1 || index === -1) return this.tail;
    if (index < this.length * -1 || index >= this.length)
      throw new Error("Index out of bounds");

    // 优化方向: 折半查找

    if (index < 0) {
      let temp = this.tail;
      for (let i = this.length - 1; i > this.length + index; i--)
        temp = temp.prev;
      return temp;
    } else {
      let temp = this.head;
      for (let i = 0; i < index; i++) temp = temp.next;
      return temp;
    }
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
    prev.next.prev = newNode;

    prev.next = newNode;
    newNode.prev = prev;

    this.length++;
    return this;
  }

  remove(index) {
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();
    if (index < 0 || index >= this.length)
      throw new Error("Index out of bounds");

    let temp = this.get(index);

    temp.prev.next = temp.next;
    temp.next.prev = temp.prev;
    temp.prev = null;
    temp.next = null;
    this.length--;
    return temp;
  }
}
