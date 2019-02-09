# Linked List

Create a `Linked List` and Node using the class keyword. Add to the Linked List prototype a method to add a new node.
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
