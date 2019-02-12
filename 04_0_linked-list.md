# Linked List

Create a `Linked List` and `Node` using the `class keyword`. Add to the Linked List prototype a method to add/insert a new node.
The list should be double: with previous and next references.

## Solution:

```javascript
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
```

## Result

```
LinkedList {
  head:
   Node {
     value: 20,
     next: Node { value: 10, next: null, prev: [Circular] },
     prev: null },
  tail:
   Node {
     value: 10,
     next: null,
     prev: Node { value: 20, next: [Circular], prev: null } } }
Function took 4.377403020858765 milliseconds.
```

_Note_: Notice that the node with value 20 has the property prev with value null (since it is the head); node with value 10 has the property next with value null since it´s the tail node.

# Other methods:

Currently, we can only `add a head node`: `Object.addHead(value)`
We want -also- to have...

1. Add tail node: `Object.addTail(value)`
2. Remove head node: `Object.removeHead()`
3. Remove tail node: `Object.removeTail()`
4. Search for values (if value, we will return in its first occurrence): `Object.searchValue(value)`
5. Search by index: `Object.searchIndex(index)`
   ...

And some helpers (even when we could refer to this.head and this.tail)

* `Object.getHead()`
* `Object.getTail()`

_Note_: If we have JUST one node this entry will be both `head` and `tail`

---

## Solution: Add tail node

```javascript
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
```

## Result:

```
{…}
head: Object { value: 20, next: {…}, prev: null
tail: Object { value: 0, next: null, prev: {…} }
<prototype>: Object { addHead: addHead(), addTail: addTail(), … }
```

---

## Solution: Remove head node

```javascript
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
```

## Result:

```
{…}
head: Object { value: 10, next: {…}, prev: null }
tail: Object { value: 0, next: null, prev: {…} }
<prototype>: Object { addHead: addHead(), addTail: addTail(), removeHead: removeHead(), … }
```

---

## Solution: Remove tail node

```JavaScript
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
```

## Result:

```
{…}
head: Object { value: 10, next: null, prev: null }
tail: Object { value: 10, next: null, prev: null }
<prototype>: Object { addHead: addHead(), addTail: addTail(), removeHead: removeHead(), … }
```

---

## Solution: Search for x value

```JavaScript
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
```

## Result:

```
"We have 20"
```

---

## Solution: Search by index

```javascript
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
```

## Result:

For a list with the following structure (head ... node ... tail): `15 - 0 - 30 - 20 - 10`

```
Object { value: 20, next: {…}, prev: {…} }
```

---

## Solution: Add node (x-index)

```JavaScript
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
```

## Result:

_Note_: We expect... For a list with the following structure (head ... node ... tail): `30 - 20 - 10`
If index is less than 0 or 0 >> `60 - 30 - 20 - 10`
If index is bigger than the last index (in this case, 3 or bigger) >> `30 - 20 - 10 - 60`
If index is 1 >> `30 - 60 - 20 - 10`
If index is 2 >> `30 - 20 - 60 - 10`

Example with index 2...

```
{…}
head: {…}
next: {…}
next: Object { value: 60, next: {…}, prev: null }
prev: Object { value: 30, next: {…}, prev: null }
value: 20
<prototype>: Object { … }
prev: null
value: 30
<prototype>: Object { … }
tail: Object { value: 10, next: null, prev: {…} }
<prototype>: Object { addHead: addHead(), addTail: addTail(), searchIndex: searchIndex(), … }
```

---

## Solution: Remove node (x-index)

```javascript
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
```

## Result

```

```

---

## Helpers:

```javascript
LinkedList.prototype.getHead = function() {
  return this.head;
};

LinkedList.prototype.getTail = function() {
  return this.tail;
};

LL.getHead();

LL.getTail();
```
