# Queue (FIFO: First In, First Out)

Create a `Queue` using the `class keyword`. Add to the Queue prototype the following methods:

* Object.add(value)
* Object.remove(value)

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

_Note:_ Perhaps the right terminology would be push instead of add, however, I want to keep independency between native function (like push for Arrays) and ours.

## Solution:

## Result:
