# Queue (FIFO: First In, First Out)

Queue visual representation: https://www.cs.usfca.edu/~galles/visualization/QueueArray.html

A "practical" example would be waiting in line.

---

> In computer science, a queue is a collection of entities that are maintained in a sequence and can be modified by the addition of entities at one end of the sequence and the removal of entities from the other end of the sequence. By convention, the end of the sequence at which elements are added is called the back, tail, or rear of the queue, and the end at which elements are removed is called the head or front of the queue, analogously to the words used when people line up to wait for goods or services.
The operation of adding an element to the rear of the queue is known as enqueue, and the operation of removing an element from the front is known as dequeue. Other operations may also be allowed, often including a peek or front operation that returns the value of the next element to be dequeued without dequeuing it. Source: [Queue (abstract data type)](https://en.wikipedia.org/wiki/Queue_(abstract_data_type))

---

### Operations:

1. Enqueue: adding an element.
2. Dequeue: removing an element.

### Time Complexity (Big O) for Q with array

1. Enqueue: `arr[0]` -> `O(1)` or constant.
2. Dequeue: `arr[arr.length - 1]` -> `O(1)` or constant.

*Note:* 

1. We are always adding/removing to/from the **END**. Given that arrays in JS have the built-in property `length`, we don't have to do further calculations. 
2. Lookup operations are `constant`. 

```js
const list = [1, 2, 3];

list[0] // 1
list[1] // 2
list[list.length - 1]
```

*Note:*
`list[list.length - 1]` remember that the first index of an array is 0 and the length is the total amount of elements. If you want to lookup the last element, you need to subtract 1 to its length.

## Queue: Array implementation > this._data = []

```js
class Queue {

  constructor() {
    this._data = [];
  }

  ifQisEmptyHelper(method) {
    if (this._data.length < 1) console.log(`The Q is empty! Error when trying to: ${method}`)
  }

  enqueue(value) {
    this._data.unshift(value)
  }
  
  dequeue() {
    this.ifQisEmptyHelper('dequeue')
    this._data.pop()
  }

  peek() {
    this.ifQisEmptyHelper('peek')
    const firstElementInQ = this._data[this._data.length - 1]
    console.log(firstElementInQ)
  }
}

const myQueue = new Queue();

myQueue.dequeue()

myQueue.enqueue(1)
myQueue.enqueue(2)
myQueue.enqueue(3)

myQueue.dequeue()
myQueue.dequeue()

myQueue.peek()

console.log(myQueue);
```

Some considerations:

1. `_` is a general convention to "define" a property as internal, meaning that you should not access the property directly.
Remember it is a convention, so you can interact with the property even when you MUST NOT do it.

DO NOT do this
```js
myQueue._data = 10
console.log(myQueue);
// Queue { _data: 10 }
```

The good news, at the time of writing these notes, [Class field declarations for JavaScript](https://github.com/tc39/proposal-class-fields) is in `stage 3` and moving through the ladder, so at future we should be able to have -natively- "private fields" in JS:

```js
class Queue {
  
  #data

  constructor() {
    this.#data = [];
  }

}
```

Until it becomes part of JS, you can use Babel with the proper polyfiller. Take a look to [Babel](https://babeljs.io/docs/en/usage)

<!--
TODO: Add example with private field
-->

2. I have seen several examples extending the "object prototype"






## Solution:

```JavaScript
class Queue {
  constructor() {
    this.data = [];
  }
}


Queue.prototype.add = function(value) {
  // adds at the beginning
  this.data.unshift(value);
}

Queue.prototype.remove = function() {
  // removes from the end
  this.data.pop();
}


let Q = new Queue();
Q.add(1);
Q.add(2);
Q.add(3);

Q.remove();

console.log(Q.data);
```

## Result:

```
[ 3, 2 ]
```

---

Now we are going to empty the Queue processing one-by-one and in the proper order (FIFO); log the element or record in the queue and remove it from it.

## Solution:

```javascript
Queue.prototype.get = function() {
  return this.data.pop();
};

let Q = new Queue();
Q.add(1);
Q.add(2);
Q.add(3);

console.log('Initial Q', Q.data);

while (Q.data.length) {
  console.log(Q.get());
}

console.log('Empty Q', Q.data);
```

## Result:

```
Initial Q [ 3, 2, 1 ]
1
2
3
Empty Q []
```

---

Finally, let´s create our Queue using 2 sources.

* Source 1: [5, 3, 1]
* Source 2: [2, 4, 7, 6]

The result should be: [ 7, 6, 5, 4, 3, 2, 1 ]

## Solution:

```javascript
let s1 = [1, 5, 3];
let s2 = [2, 4, 7, 6];

// This is a helper for sorting desc
let descSort = function(a, b) {
  return b - a;
};

let Q = new Queue();

s1.sort(descSort); // [5, 3, 1]
s2.sort(descSort); // [7, 6, 4, 2]

while (s1.length || s2.length) {
  // Source 1
  if (s1.length) {
    let record = s1.pop();
    Q.add(record);
  }

  // Source 2
  if (s2.length) {
    let record = s2.pop();
    Q.add(record);
  }
}

console.log(Q.data);
```

## Result:

```
[ 7, 6, 5, 4, 3, 2, 1 ]
```

---

# Stack (FILO: First In, Last Out)

Create a `Stack` using the `class keyword`. Add to the Stack prototype the following methods:

* Object.add(value)
* Object.remove(value)

_Note:_ Perhaps the right terminology would be push instead of add, however, I want to keep independency between native function (like push for Arrays) and ours. The same for pop which is going to be referenced as remove.

## Solution:

```JavaScript
class Stack {
  constructor() {
    this.data = [];
  }
}

Stack.prototype.add = function(value) {
  // At at the end
  this.data.push(value);
}

Stack.prototype.remove = function() {
  // It will remove the last one
  return this.data.pop();
}

let S = new Stack();

S.add(10);
S.add(20);
S.add(30);

S.remove();

console.log(S.data);
```

## Result:

```
[ 10, 20 ]
```

Graphically, our stack would be something like...

```
______
| 30 |
| 20 |
| 10 |
|____|
```
