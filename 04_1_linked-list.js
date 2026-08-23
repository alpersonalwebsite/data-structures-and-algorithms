// Doubly linked list, assembled from 04_0_linked-list.md.
//
// GENERATED. `npm test` regenerates this from the notes and fails if the two differ, so reading
// either one is safe. Before that check existed they had drifted: this pairing once had one method
// against ten documented, and the queue-and-stack file was empty while its notes were not.
//
// Regenerate with: npm run build

// ---- from 04_0_linked-list.md:9
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

// ---- from 04_0_linked-list.md:92
LinkedList.prototype.addTail = function(value) {
  // next is null since this is the tail node
  let newNode = new Node(value, null, this.tail);

  // if we have a node or more
  if (this.tail) {
    this.tail.next = newNode;
  } else {
    this.head = newNode;
  }
  this.tail = newNode;
};

console.log(LL);
LL.addTail(0);

// ---- from 04_0_linked-list.md:123
LinkedList.prototype.removeHead = function() {
  // if list is empty
  if (!this.head) return null;

  this.head = this.head.next;
  if (this.head) {
    this.head.prev = null;
  } else {
    this.tail = null;
  }
};

LL.removeHead();
console.log(LL);

// ---- from 04_0_linked-list.md:153
LinkedList.prototype.removeTail = function() {
  if (!this.tail) return null;

  this.tail = this.tail.prev;
  if (this.tail) {
    this.tail.next = null;
  } else {
    this.head = null;
  }
}

LL.removeTail();
console.log(LL);

// ---- from 04_0_linked-list.md:182
LinkedList.prototype.searchValue = function(value) {
  let currentNode = this.head;

  while (currentNode) {
    if (currentNode.value === value) return 'We have ' + value;

    // Go to next node
    currentNode = currentNode.next;
  }

  // in case we dont find value
  return null;
}

LL.searchValue(20);

// ---- from 04_0_linked-list.md:210
LinkedList.prototype.searchIndex = function(index) {
  // if empty
  if (!this.head) return null;

  let counter = 0;
  let currentNode = this.head;

  while (currentNode) {
    if (counter === index) return currentNode;

    counter++;
    currentNode = currentNode.next;
  }

  // If we pass an index bigger than our last element.
  return null;
};

LL.searchIndex(3);

// ---- from 04_0_linked-list.md:244
LinkedList.prototype.addNode = function(index, value) {
  // if empty we reuse addHead() method
  // If index is 0 or less than 0 itg should be head
  if (!this.head || index < 1) return this.addHead(value);

  // We need to find the node at that index: null or node
  let nodeAtIndex = this.searchIndex(index);
  // If index > last index it should be head
  if (!nodeAtIndex) return this.addTail(value);

  let prevNode, nextNode;

  if (nodeAtIndex) {
    prevNode = nodeAtIndex.prev;
    nextNode = nodeAtIndex.next;
  }

  let newNode = new Node(value, nodeAtIndex, prevNode);
  prevNode.next = newNode;
}

LL.addNode(2,60);

// ---- from 04_0_linked-list.md:298
LinkedList.prototype.removeNode = function(index) {
  // if empty or less than 0, just return
  if (!this.head || index < 0) return;

  // if index is 0, so it is the head
  if (index === 0) {
    this.head = this.head.next;
    this.head.prev = null;
    return;
  }

  // We need to find the node at that index: null or node
  let nodeAtIndex = this.searchIndex(index);

  // if we dont have that index
  if (!nodeAtIndex) return;

  let prevNode, nextNode;

  if (nodeAtIndex && nodeAtIndex.next) {
    prevNode = nodeAtIndex.prev;
    nextNode = nodeAtIndex.next;
  } else {
    this.tail = this.tail.prev;
    this.tail.next = null;
    return;
  }

  prevNode.next = nextNode;
  nextNode.prev = prevNode;
};

LL.removeNode(1);

// ---- from 04_0_linked-list.md:347
LinkedList.prototype.getHead = function() {
  return this.head;
};

LinkedList.prototype.getTail = function() {
  return this.tail;
};

LL.getHead();

LL.getTail();
