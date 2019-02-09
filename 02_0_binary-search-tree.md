# Binary Search Tree

Create a `Binary Search Tree` using the `class keyword` and add through its `prototype` a function to insert/`add nodes` to the tree.

## Solution:

```JavaScript
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
      this.left = new BinarSearchTree(value)
    } else {
      this.left.add(value);
    }
  } else {
     if (!this.right) {
      this.right = new BinarSearchTree(value)
    } else {
      this.right.add(value);
    }
  }
}

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
```

## Result:

Time may vary in relation to the processes running on your machine.

```
BinarSearchTree {
  value: 50,
  left:
   BinarSearchTree {
     value: 40,
     left: BinarSearchTree { value: 12, left: null, right: null },
     right: null },
  right:
   BinarSearchTree {
     value: 100,
     left: BinarSearchTree { value: 90, left: null, right: [Object] },
     right: null } }
Function took 4.59142804145813 milliseconds.
```
