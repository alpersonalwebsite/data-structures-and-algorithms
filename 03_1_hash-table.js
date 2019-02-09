const { performance } = require('perf_hooks');

const startingTime = performance.now();

// Start of code

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
  const abc = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
  ];

  const result = abc.indexOf(key[0].toLowerCase());
  const bucket = result % this.numberOfBuckets;
  return bucket;
};

HasthTable.prototype.add = function(key, value) {
  key = key.toLowerCase();
  // We only accept string
  if (key.replace(/[a-z]/g, '') || key.length < 1) {
    console.log('Provide a valid key!');
    return;
  }

  const bucketIndex = this.hash(key);

  // If we dont have nothing in that bucket
  if (!this.buckets[bucketIndex]) {
    this.buckets[bucketIndex] = new Node(key, value);
  } else {
    const currentNode = this.buckets[bucketIndex];
    while (currentNode.next) {
      currentNode = currentNode.next;
    }
    currentNode.next = new Node(key, value);
  }
};

// ABC > 26
let HT = new HasthTable(26);
HT.add('Casa', 'Casa Grande');
HT.add('A', 'Hello');
HT.add('Adding', 'Adding collision');

console.log(HT);

// End of code

const endingTime = performance.now();
console.log('Function took ' + (endingTime - startingTime) + ' milliseconds.');
