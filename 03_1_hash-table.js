// Hash table, assembled from 03_0_hash-table.md.
//
// GENERATED. `npm test` regenerates this from the notes and fails if the two differ, so reading
// either one is safe. Before that check existed they had drifted: this pairing once had one method
// against eight documented, and the queue-and-stack file was empty while its notes were not.
//
// Regenerate with: npm run build

// ---- from 03_0_hash-table.md:21
class HashTable {
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
HashTable.prototype.hash = function(key) {
  const abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  const result = abc.indexOf(key[0].toLowerCase());
  const bucket = result % this.numberOfBuckets;
  return bucket;
}

HashTable.prototype.add = function(key, value) {
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
    // `let`, not `const`: this walks the chain by reassigning. With `const` it throws
    // TypeError: Assignment to constant variable. once the loop body runs, which needs a
    // THIRD key in one bucket. `get` and `getAll` below already use `let`, so this was a slip.
    let currentNode = this.buckets[bucketIndex];

    while (currentNode.next) {
      currentNode = currentNode.next;
    }
    currentNode.next = new Node(key, value);
  }
}

// ABC > 26
let HT = new HashTable(26);
HT.add('Casa', 'Casa Grande');
HT.add('A', 'Hello');
HT.add('Adding', 'Adding collision')

console.log(HT);

// ---- from 03_0_hash-table.md:112
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

// Reassigning rather than redeclaring: this section shows another way to fill the SAME
// table, and `let HT` a second time is a SyntaxError if you paste the file in order.
HT = new HashTable(26);

for (let i = 0; i < objKeys.length; i++) {
  HT.add(objKeys[i], objValues[i]);
}

console.log(HT);

// ---- from 03_0_hash-table.md:157
HashTable.prototype.get = function(key) {
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

// ---- from 03_0_hash-table.md:198
HashTable.prototype.getAll = function() {
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
