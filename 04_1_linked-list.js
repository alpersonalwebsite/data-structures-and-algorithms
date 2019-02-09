const { performance } = require('perf_hooks');

const startingTime = performance.now();

// Start of code

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
}

class Node {
  constructor(value, next, prev) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}

LinkedList.prototype.addHead = function(value) {
  // Next should be current head
  let newNode = new Node(value, this.head, null);

  // if we have a head
  if (this.head) {
    //console.log(this.head)
    // we set this new node as prev
    this.head.prev = newNode;
    //this.head = newNode;
  } else {
    this.tail = newNode;
  }
  // New head of the List
  this.head = newNode;
};

let LL = new LinkedList();

LL.addHead(10);
LL.addHead(20);

console.log(LL);

// End of code

const endingTime = performance.now();
console.log('Function took ' + (endingTime - startingTime) + ' milliseconds.');
