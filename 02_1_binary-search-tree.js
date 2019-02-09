const { performance } = require('perf_hooks');

const startingTime = performance.now();

// Start of code

class BinarSearchTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

BinarSearchTree.prototype.add = function(value) {
  if (value <= this.value) {
    if (!this.left) {
      this.left = new BinarSearchTree(value);
    } else {
      this.left.add(value);
    }
  } else {
    if (!this.right) {
      this.right = new BinarSearchTree(value);
    } else {
      this.right.add(value);
    }
  }
};

let arr = [50, 100, 40, 12, 90, 98];

let BST;
for (let i = 0; i < arr.length; i++) {
  if (i === 0) {
    BST = new BinarSearchTree(arr[0]);
  } else {
    BST.add(arr[i]);
  }
}

console.log(BST);

// End of code

const endingTime = performance.now();
console.log('Function took ' + (endingTime - startingTime) + ' milliseconds.');
