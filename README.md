> 数据结构全解参考：[数据结构 | 博客园-SRIGT](https://www.cnblogs.com/SRIGT/p/17841478.html)

> 相关代码仓库查看：[data-struct-js | Github-SR1GT](https://github.com/SR1GT/data-struct-js)

# 0x00 前置知识

## （1）类

1. 使用关键字 `class` 声明一个类

   ```js
   class Person {
     
   }
   ```

2. JavaScript 的类中通过 `constructor` 使用构建函数 

   ```js
   class Person {
     constructor(name) {
       this.name = name;
     }
   }
   ```

3. 定义 Getter 与 Setter

   ```js
   class Person {
     constructor(name) {
       this.name = name;
     }
     getName() {
       return this.name;
     }
     setName(name) {
       this.name = name;
     }
   }
   ```

4. 使用关键字 `new` 创建对象，并调用对象方法

   ```js
   class Person {
     constructor(name) {
       this.name = name;
     }
     getName() {
       return this.name;
     }
     setName(name) {
       this.name = name;
     }
   }
   
   var person = new Person("SRIGT");
   console.log(person.getName());		// "SRIGT"
   person.setName("SR1GT");
   console.log(person.getName());		// "SR1GT"
   ```

## （2）指针

* 以下代码仅实现值的传递，并未涉及指针

  ```js
  var num1 = 1;
  var num2 = num1;
  console.log(num1, num2);	// 1 1
  num1 = 2;
  console.log(num1, num2);	// 2 1
  ```

* 当声明的变量是对象时，实现指针的传递

  ```js
  var num1 = { value: 1 };
  var num2 = num1;
  console.log(num1.value, num2.value);	// 1 1
  num1.value = 2;
  console.log(num1.value, num2.value);	// 2 2
  ```

  * `var num2 = num1;` 是将变量 `num2` 指向 `num1`，同时 `num1` 又指向对象 `{ value: 1 }`

* 当某个对象不被任何变量指向时，该对象不可访问，但依旧占用内存空间，此时 JavaScript 提供的垃圾回收机制很好的解决了这个问题

## （3）递归

* 递归是指在函数中调用自身

  ```js
  function func() {
    if (condition === true) return;
    func();
  }
  ```

  * 当没有合适条件停止递归，会造成堆栈溢出

* 举例：阶乘

  ```js
  function factorial(n) {
    if (n === 1) return 1;
    return n * factorial(n - 1);
  }
  
  console.log(factorial(4));		// 24
  ```

# 0x01 链表

## （1）单链表

1. 声明类并实现构造函数

   ```js
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
   }
   
   var myLinkedList = new LinkedList(1);
   console.log(myLinkedList);
   ```

2. 在 `LinkedList` 类中，添加 `push` 方法，用于在尾部添加节点

   ```js
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
   ```

3. 添加 `pop` 方法，用于删除尾部最后一个节点

   ```js
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
   ```

4. 添加 `unshift` 和 `shift` 方法，分别用于在头部添加和删除第一个节点

   ```js
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
   ```

5. 添加 `get` 方法，用于获取特定索引位置的值

   ```js
   get(index) {
     if (index === 0) return this.head;
     if (index < this.length * -1 || index >= this.length)
       throw new Error("Index out of bounds");
     if (index < 0) index = this.length + index;
     let temp = this.head;
     for (let i = 0; i < index; i++) temp = temp.next;
     return temp;
   }
   ```

6. 添加 `set` 方法，用于修改指定位置的值

   ```js
   set(index, value) {
     let temp = this.get(index);
     if (!temp) return false;
     temp.value = value;
     return true;
   }
   ```

7. 添加 `insert` 方法，用于在指定位置添加新节点

   ```js
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
   ```

8. 添加 `remove` 方法，用于删除指定位置的节点

   ```js
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
   ```

9. 添加 `reverse` 方法，用于翻转链表

   ```js
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
   ```

10. 添加 `forEach` 方法，用于遍历链表

    ```js
    forEach(callback) {
      if (!this.head) return;
      let temp = this.head;
      while (temp) {
        callback(temp);
        temp = temp.next;
      }
    }
    ```

## （2）双向链表

1. 声明类并实现构造函数

   ```js
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
   }
   
   var myDoublyLinkedList = new DoublyLinkedList(1);
   console.log(myDoublyLinkedList);
   ```

2. `push` 与 `pop` 方法

   ```js
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
   ```

3. `unshift` 与 `shift` 方法

   ```js
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
   ```

4. `get` 与 `set` 方法

   ```js
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
   ```

5. `insert` 与 `remove` 方法

   ```js
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
   ```

## （3）栈

1. 声明类并实现构造函数

   ```js
   class Node {
     constructor(value) {
       this.value = value;
       this.next = null;
     }
   }
   
   class Stack {
     constructor(value) {
       this.top = new Node(value);
       this.length = 1;
     }
   }
   
   var myStack = new Stack(1);
   console.log(myStack);
   ```

2. 压栈方法 `push`

   ```js
   push(value) {
     const newNode = new Node(value);
     if (!this.top) this.top = newNode;
     else {
       newNode.next = this.top;
       this.top = newNode;
     }
     this.length++;
     return this;
   }
   ```

3. 出栈方法 `pop`

   ```js
   pop() {
     if (!this.top) return undefined;
     let temp = this.top;
     this.top = this.top.next;
     temp.next = null;
     this.length--;
     if (this.length === 0) this.top = null;
     return temp;
   }
   ```

## （4）队列

1. 声明类并实现构造函数

   ```js
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
   }
   
   var myQueue = new Queue(1);
   console.log(myQueue);
   ```

2. 入队方法 `enQueue`

   ```js
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
   ```

3. 出队方法 `deQueue`

   ```js
   deQueue() {
     if (!this.first) return undefined;
     let temp = this.first;
     this.first = this.first.next;
     temp.next = null;
     this.length--;
     if (this.length === 0) this.first = this.last = null;
     return temp;
   }
   ```

# 0x02 树与表

## （1）二叉搜索树

1. 声明类并实现构造函数

   ```js
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
   }
   
   var myBST = new BinarySearchTree();
   console.log(myBST);
   ```

2. 添加 `insert` 方法，用于添加节点

   ```js
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
   ```

3. 添加 `contains` 方法，用于判断节点是否存在

   ```js
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
   ```

4. 添加 `minValueNode` 方法，获取最小节点值

   ```js
   minValueNode() {
     let temp = this.root;
     while (temp.left) temp = temp.left;
     return temp;
   }
   ```

## （2）哈希表

1. 声明类并实现构造函数

   ```js
   class HashTable {
     constructor(size = 10) {
       this.dataMap = new Array(size);
     }
   
     _hash(key) {
       let hash = 0;
       for (let i in key)
         hash = (hash + key.charCodeAt(i) * 23) % this.dataMap.length;
       return hash;
     }
   }
   
   var myHashTable = new HashTable();
   console.log(myHashTable);
   ```

2. 添加 `set` 方法，用于添加新映射

   ```js
   set(key, value) {
     const index = this._hash(key);
     if (!this.dataMap[index]) this.dataMap[index] = [];
     this.dataMap[index].push({ key: key, value: value });
     return this;
   }
   ```

3. 添加 `get` 方法，用于获取键值对应的值

   ```js
   get(key) {
     const index = this._hash(key);
     if (this.dataMap[index])
       for (let item of this.dataMap[index]) if (item.key === key) return item.value;
     return undefined;
   }
   ```

4. 添加 `keys` 方法，用于获取全部键

   ```js
   keys() {
     let allKeys = [];
     for (let item of this.dataMap)
       if (item) for (let kv of item) allKeys.push(kv.key);
     return allKeys;
   }
   ```

# 0x03 图

> 采用**邻接表**实现

## （1）无向图

1. 声明类并实现构造函数

   ```js
   class Graph {
     constructor() {
       this.adjacencyList = new Object();
     }
   }
   
   var myGraph = new Graph();
   console.log(myGraph);
   ```

2. 添加 `addVertex` 方法，用于新增顶点

   ```js
   addVertex(vertex) {
     if (!this.adjacencyList[vertex]) {
       this.adjacencyList[vertex] = [];
       return this;
     }
     throw new Error("Vertex already exists");
   }
   ```

3. 添加 `addEdge` 方法，用于新增边

   ```js
   addEdge(vertex1, vertex2) {
     if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
       this.adjacencyList[vertex1].push(vertex2);
       this.adjacencyList[vertex2].push(vertex1);
       return this;
     }
     throw new Error("Vertex not found");
   }
   ```

4. 添加 `removeEdge` 方法，用于删除边

   ```js
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
   ```

5. 添加 `removeVertex` 方法，用于删除顶点

   ```js
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
   ```

## （2）有向图

1. 声明类并实现构造函数

   ```js
   class Digraph {
     constructor() {
       this.adjacencyList = new Object();
     }
   }
   
   var myDigraph = new Digraph();
   console.log(myDigraph);
   ```

2. 添加 `addVertex` 方法，用于新增顶点

   ```js
   addVertex(vertex) {
     if (!this.adjacencyList[vertex]) {
       this.adjacencyList[vertex] = [];
       return this;
     }
     throw new Error("Vertex already exists");
   }
   ```

3. 添加 `addEdge` 方法，用于新增有向边

   ```js
   addEdge(vertexFrom, vertexTo) {
     if (this.adjacencyList[vertexFrom] && this.adjacencyList[vertexTo]) {
       this.adjacencyList[vertexFrom].push(vertexTo);
       return this;
     }
     throw new Error("Vertex not found");
   }
   ```

4. 添加 `removeEdge` 方法，用于删除边

   ```js
   removeEdge(vertexFrom, vertexTo) {
     if (this.adjacencyList[vertexFrom] && this.adjacencyList[vertexTo]) {
       this.adjacencyList[vertexFrom] = this.adjacencyList[vertexFrom].filter(
         (vertex) => vertex != vertexTo
       );
       return this;
     }
     throw new Error("Vertex not found");
   }
   ```

5. 添加 `removeVertex` 方法，用于删除顶点

   ```js
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
   ```

# 0x04 树遍历算法

构造树

```js
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
}
```

本章的算法均作为类方法写在 `Tree` 类中

## （1）广度优先搜索 BFS

* 广度优先搜索（Breadth First Search）指对于一个二叉树进行**层序遍历**

  * 举例：有如下二叉树

    ```mermaid
    flowchart TB
    20-->15 & 26
    15-->4 & 19
    26-->22 & 102
    ```

    其 BFS 结果为

    ```mermaid
    flowchart LR
    20-->15-->26-->4-->19-->22-->102
    ```

* 算法实现

  ```js
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
  ```

  测试

  ```js
  var myTree = new Tree();
  myTree.insert(20);
  myTree.insert(15);
  myTree.insert(4);
  myTree.insert(19);
  myTree.insert(26);
  myTree.insert(22);
  myTree.insert(102);
  console.log(myTree.BFS());
  ```

## （2）深度优先搜索 DFS

* 深度优先搜索（Depth First Search）指对于一个二叉树进行**中序遍历**（或**前序遍历**、**后序遍历**）

  * 举例：有如下二叉树

    ```mermaid
    flowchart TB
    20-->15 & 26
    15-->4 & 19
    26-->22 & 102
    ```

    其 DFS 结果为

    ```mermaid
    flowchart LR
    4-->15-->19-->20-->22-->26-->102
    ```

* 算法实现

  ```js
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
  ```

  测试

  ```js
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
  ```

# 0x05 排序算法

## （1）冒泡排序

从后出发，比较并交换，使最后一个值为最大值，进入下一个，重复上述操作

```js
Array.prototype.bubble = function () {
  for (let i = this.length - 1; i > 0; i--)
    for (let j = 0; j < i; j++)
      if (this[j] > this[j + 1])
        [this[j], this[j + 1]] = [this[j + 1], this[j]];
  return this;
};

console.log([4, 2, 3, 1, 5].bubble());
```

## （2）选择排序

（冒泡排序的逆向）从头出发，记录当前位置以后的最小值的索引，比较并交换，进入下一个，重复上述操作

```js
Array.prototype.selection = function () {
  let minIndex = this[0];
  for (let i = 0; i < this.length - 1; i++) {
    minIndex = i;
    for (let j = i + 1; j < this.length; j++)
      if (this[j] < this[minIndex]) minIndex = j;
    if (i !== minIndex) [this[i], this[minIndex]] = [this[minIndex], this[i]];
  }
  return this;
};

console.log([4, 2, 3, 1, 5].selection());
```

## （3）插入排序

从第二项出发，找到比当前值小的值，该小值以后的值后移一位，小值后面插入到当前值，进入下一个，重复此操作

```js
Array.prototype.insertion = function () {
  for (let i = 1; i < this.length; i++) {
    let temp = this[i];
    for (var j = i - 1; this[j] > temp && j >= 0; j--) this[j + 1] = this[j];
    this[j + 1] = temp;
  }
  return this;
};

console.log([4, 2, 3, 1, 5].insertion());
```

## （4）合并排序

将数组递归二分分组，直至每组只有两个数字，比较并交换后逐步合并各组至原数组大小

1. 编写 `merge` 方法，用于按大小合并两个数组

   ```js
   const merge = (array1, array2) => {
     let i = 0,
       j = 0,
       result = [];
     while (i < array1.length && j < array2.length)
       if (array1[i] < array2[j]) result.push(array1[i++]);
       else result.push(array2[j++]);
     while (i < array1.length) result.push(array1[i++]);
     while (j < array2.length) result.push(array2[j++]);
     return result;
   };
   ```

2. 结合合并方法，完成合并排序方法

   ```js
   Array.prototype.merge = function () {
     if (this.length <= 1) return this;
   
     const merge = (array1, array2) => {/*...*/};
   
     let mid = Math.floor(this.length / 2),
       left = this.slice(0, mid),
       right = this.slice(mid);
     return merge(left.merge(), right.merge());
   };
   
   console.log([4, 2, 3, 1, 5].merge());
   ```

## （5）快速排序

找到中心值，所有小于中心值的值放在中心值以左，其余的值放在中心值以右，递归此操作

1. 编写 `pivot` 方法，用于获取数组中心值的索引

   ```js
   const pivot = (array, pivotIndex, endIndex) => {
     let temp = pivotIndex;
     for (let i = pivotIndex + 1; i <= endIndex; i++)
       if (array[i] < array[pivotIndex]) {
         temp++;
         [array[temp], array[i]] = [array[i], array[temp]];
       }
     [array[pivotIndex], array[temp]] = [array[temp], array[pivotIndex]];
     return temp;
   };
   ```

2. 结合中心值索引获取方法，完成快速排序方法

   ```js
   Array.prototype.quick = function (left = 0, right = this.length - 1) {
     const pivot = (pivotIndex, endIndex) => {/*...*/};
   
     if (left < right) {
       const pivotIndex = pivot(left, right);
       this.quick(left, pivotIndex - 1);
       this.quick(pivotIndex + 1, right);
     }
     return this;
   };
   ```

   

