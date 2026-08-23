// Binary search tree, assembled from 02_0_binary-search-tree.md.
//
// GENERATED. `npm test` regenerates this from the notes and fails if the two differ, so reading
// either one is safe. Before that check existed they had drifted: this pairing once had one method
// against ten documented, and the queue-and-stack file was empty while its notes were not.
//
// Regenerate with: npm run build

// ---- from 02_0_binary-search-tree.md:8
class BinarySearchTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

BinarySearchTree.prototype.add = function(value) {
  if (value <= this.value) {
    if (!this.left) {
      this.left = new BinarySearchTree(value)
    } else {
      this.left.add(value);
    }
  } else {
     if (!this.right) {
      this.right = new BinarySearchTree(value)
    } else {
      this.right.add(value);
    }
  }
}

let arr = [50, 100, 40, 12, 90, 98];

let BST;
for (let i = 0; i < arr.length; i++) {
  if (i === 0) {
    BST = new BinarySearchTree(arr[0]);
  } else {
    BST.add(arr[i]);
  }
}

console.log(BST);

// ---- from 02_0_binary-search-tree.md:94
// I start with -1 to take 0 as a level like arr
let levels = -1;

BinarySearchTree.prototype.get = function(value) {
  levels++;

  // if value is root node
  if (this.value === value) {
    return true;
  }

  // There are 2 possibilities: left>less, right>bigger

  if (value > this.value) {
    // if we dont have that value. Example: 1000
    if (!this.right) return false;
    else {
      // recursion
      return this.right.get(value);
    }
  }

  if (value < this.value) {
    if (!this.left) return false;
    else {
      // recursion
      return this.left.get(value);
    }
  }
};

console.log(BST.get(99));
console.log(levels);

// ---- from 02_0_binary-search-tree.md:163
BinarySearchTree.prototype.depth = function(traverseFn) {
  traverseFn(this.value);
  if (this.left) {
    this.left.depth(traverseFn);
  }
  if (this.right) {
    this.right.depth(traverseFn);
  }
};

function logInConsole(value) {
  console.log(value);
}

BST.depth(logInConsole);

// ---- from 02_0_binary-search-tree.md:196
BinarySearchTree.prototype.breadth = function (traverseFn) {

// we start with a queue with our tree
let q = [this];

// we iterate the q until we dont have more nodes
while (q.length) {
  // we remove the first element and log it
  let level = q.shift();
  traverseFn(level.value);

  if (level.left) q.push(level.left);
  if (level.right) q.push(level.right);
}

}

function logInConsole(value) {
  console.log(value);
}

BST.breadth(logInConsole);

// ---- from 02_0_binary-search-tree.md:237
BinarySearchTree.prototype.min = function() {
  if (this.left) return this.left.min();
  else return this.value;
};

BinarySearchTree.prototype.max = function() {
  if (this.right) return this.right.max();
  else return this.value;
};

console.log(BST.min());
console.log(BST.max());
