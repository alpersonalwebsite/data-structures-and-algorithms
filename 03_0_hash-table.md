# Hash Table

Create a `Hash Table` (with 26 buckets) and a `Node` using the `class keyword` and add through the Hash Table prototype a function to insert/add a Node previously "hashed".

For demo purposes, the hash function should take the first letter of the key and store the key/value data in the proper bucket (or cell). _There´s not going to be real hash_. Feel free to do it!

Note: You will have one bucket per letter of the Alphabet.
For example:

```
A >> 0
B >> 1
C >> 2
```

Be sure that you add one collision.

## Solution:

```JavaScript
class HasthTable {
  constructor(length) {
    this.buckets = Array(length);
    this.numberOfBuckets = this.buckets.length;
  }
}

class Node {
  constructor(key, value, next) {
    this.key = key;
    this.value = value;
    // In case of collisions
    this.next = next || null;
  }
}

// This IS not hashing
// Feel free to replace with a real hash function
HasthTable.prototype.hash = function(key) {
  const abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  const result = abc.indexOf(key[0].toLowerCase());
  const bucket = result % this.numberOfBuckets;
  return bucket;
}

HasthTable.prototype.add = function(key, value) {
  key = key.toLowerCase();
  // We only accept string
  if (key.replace(/[a-z]/g, '') || key.length < 1) {
    console.log('Provide a valid key!')
    return;
  }


  const bucketIndex = this.hash(key);

  // If we dont have nothing in that bucket
  if (!this.buckets[bucketIndex]) {
    this.buckets[bucketIndex] = new Node(key, value)
  }

  else {
    const currentNode = this.buckets[bucketIndex];

    while (currentNode.next) {
      currentNode = currentNode.next;
    }
    currentNode.next = new Node(key, value);
  }
}


// ABC > 26
let HT = new HasthTable(26);
HT.add('Casa', 'Casa Grande');
HT.add('A', 'Hello');
HT.add('Adding', 'Adding collision')

console.log(HT);
```

## Result:

Time may vary in relation to the processes running on your machine.

```
HasthTable {
  buckets:
   [ Node { key: 'a', value: 'Hello', next: [Object] },
     <1 empty item>,
     Node { key: 'casa', value: 'Casa Grande', next: null },
     <23 empty items> ],
  numberOfBuckets: 26 }
```

---

Before, we were using strings as inputs (arguments) for the method HT.add(s,s) and repeating the process of inserting a Node.

Now, given an object, create 2 arrays: one with its keys, the other with its values. It is safe to assume that both key and value are always going to be something.

Then, iterate and execute the HT.add(s,s) function for each piece o data.

## Possible solution:

```javascript
let obj = {
  Casa: 'Casa Grande',
  A: 'Hello',
  Adding: 'Adding collision'
};

// obj with keys
const objKeys = Object.keys(obj);
const objValues = Object.values(obj);

if (objKeys.length !== objValues.length) {
  console.log('Something went wrong!');
}

let HT = new HasthTable(26);

for (let i = 0; i < objKeys.length; i++) {
  HT.add(objKeys[i], objValues[i]);
}

console.log(HT);
```

## Result:

```
HasthTable {
  buckets:
   [ Node { key: 'a', value: 'Hello', next: [Object] },
     <1 empty item>,
     Node { key: 'casa', value: 'Casa Grande', next: null },
     <23 empty items> ],
  numberOfBuckets: 26 }
```

---

Create a method that takes an argument (string) and retrieves the proper value related to that key.
HT.get('Adding') should return 'Adding collision'.

## Solution:

```javascript
HasthTable.prototype.get = function(key) {
  key = key.toLowerCase();
  const bucketIndex = this.hash(key);

  // If the bucket is empty
  if (!this.buckets[bucketIndex]) {
    return null;
  } else {
    let currentNode = this.buckets[bucketIndex];
    while (currentNode) {
      if (currentNode.key === key) return currentNode.value;
      currentNode = currentNode.next;
    }

    return null;
  }
};

HT.get('Adding');
```

## Result:

```
'Adding collision'
```

---

Create a method to retrieve all the nodes in the Hash Table. The result should be a multi array where each sub-array hash as first element `Bucket number`

Example:
HT.getAll() should retrieve the entire array of arrays
HT.getAll()[0] should retrieve the bucket 0 array
HT.getAll()[0][0] should retrieve `'Bucket 0'`
HT.getAll()[0][1] should retrieve `Node { key: 'a', value: 'Hello', next: Node { key: 'adding', value: 'Adding collision', next: null } }`
HT.getAll()[0][2] should retrieve `Node { key: 'adding', value: 'Adding collision', next: null }`

## Solution :

```javascript
HasthTable.prototype.getAll = function() {
  let nodes = [];

  for (let i = 0; i < this.numberOfBuckets; i++) {
    let currentNode = this.buckets[i];

    nodes.push(['Bucket ' + i]);

    while (currentNode) {
      nodes[this.hash(currentNode.key)].push(currentNode);

      currentNode = currentNode.next;
    }
  }
  return nodes;
};
```

## Result:

```
[ [ 'Bucket 0',
    Node { key: 'a', value: 'Hello', next: [Node] },
    Node { key: 'adding', value: 'Adding collision', next: null } ],
  [ 'Bucket 1' ],
  [ 'Bucket 2' ],
  [ 'Bucket 3' ],
  [ 'Bucket 4' ],
  [ 'Bucket 5' ],
  [ 'Bucket 6' ],
  [ 'Bucket 7' ],
  [ 'Bucket 8' ],
  [ 'Bucket 9' ],
  [ 'Bucket 10' ],
  [ 'Bucket 11' ],
  [ 'Bucket 12' ],
  [ 'Bucket 13' ],
  [ 'Bucket 14' ],
  [ 'Bucket 15',
    Node { key: 'pasa', value: 'Casa Grande', next: null } ],
  [ 'Bucket 16' ],
  [ 'Bucket 17' ],
  [ 'Bucket 18' ],
  [ 'Bucket 19' ],
  [ 'Bucket 20' ],
  [ 'Bucket 21' ],
  [ 'Bucket 22' ],
  [ 'Bucket 23' ],
  [ 'Bucket 24' ],
  [ 'Bucket 25' ] ]
```
