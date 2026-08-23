// Queue and stack, assembled from 05_0_queue-and-stack.md.
//
// GENERATED. `npm test` regenerates this from the notes and fails if the two differ, so reading
// either one is safe. Before that check existed they had drifted: this pairing once had one method
// against eight documented, and the queue-and-stack file was empty while its notes were not.
//
// Regenerate with: npm run build

// ===== implementation 1 of 3 (the notes present these as alternatives)
// Wrapped in a block, because `class` and `let` are block-scoped and these share a name.
{
  // ---- from 05_0_queue-and-stack.md:46
  const list = [1, 2, 3];

  list[0] // 1
  list[1] // 2
  list[list.length - 1]

  // ---- from 05_0_queue-and-stack.md:59
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

  // ---- from 05_0_queue-and-stack.md:108
  myQueue._data = 10
  console.log(myQueue);
  // Queue { _data: 10 }

}

// ===== implementation 2 of 3 (the notes present these as alternatives)
// Wrapped in a block, because `class` and `let` are block-scoped and these share a name.
{
  // ---- from 05_0_queue-and-stack.md:116
  // check: standalone
  class Queue {
  
    #data

    constructor() {
      this.#data = [];
    }

  }

}

// ===== implementation 3 of 3 (the notes present these as alternatives)
// Wrapped in a block, because `class` and `let` are block-scoped and these share a name.
{
  // ---- from 05_0_queue-and-stack.md:144
  // check: standalone
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

  // ---- from 05_0_queue-and-stack.md:186
  Queue.prototype.get = function() {
    return this.data.pop();
  };

  Q = new Queue();
  Q.add(1);
  Q.add(2);
  Q.add(3);

  console.log('Initial Q', Q.data);

  while (Q.data.length) {
    console.log(Q.get());
  }

  console.log('Empty Q', Q.data);

  // ---- from 05_0_queue-and-stack.md:226
  let s1 = [1, 5, 3];
  let s2 = [2, 4, 7, 6];

  // This is a helper for sorting desc
  let descSort = function(a, b) {
    return b - a;
  };

  Q = new Queue();

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

  // ---- from 05_0_queue-and-stack.md:276
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

}
