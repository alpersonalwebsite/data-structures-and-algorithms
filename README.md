# Data structures in JavaScript

Notes on five data structures, each with the code that implements it: a binary search tree, a hash
table, a doubly linked list, a queue and a stack. Written while learning them, so they explain as they
go rather than presenting a finished library.

Each `NN_0_*.md` is the notes and each `NN_1_*.js` is the same code assembled into something you can
run:

```shell
node 04_1_linked-list.js
```

## Contents

- [Runtime complexity](./00_runtime-complexity.md)
- [Binary search tree](./02_0_binary-search-tree.md)
    - runnable: [`02_1_binary-search-tree.js`](./02_1_binary-search-tree.js)
- [Hash table](./03_0_hash-table.md)
    - runnable: [`03_1_hash-table.js`](./03_1_hash-table.js)
- [Doubly linked list](./04_0_linked-list.md)
    - runnable: [`04_1_linked-list.js`](./04_1_linked-list.js)
- [Queue and stack](./05_0_queue-and-stack.md)
    - runnable: [`05_1_queue-and-stack.js`](./05_1_queue-and-stack.js)

## The code is checked, and the two copies cannot drift

```shell
npm test     # run every notes file's code, and verify the .js files match the notes
npm run build # regenerate the .js files from the notes
```

`scripts/check-samples.mjs` concatenates each notes file's code blocks in order and **runs** them,
because each file is one program spread across blocks: one defines the class, the next adds a method,
the next exercises it. Running is what parsing cannot do. It also reports any code sitting in an
untagged fence, since a block with no language tag is invisible to tooling and its green result would
imply coverage it does not have.

`scripts/build-js.mjs` generates each `.js` from its notes and `--check` fails if they differ. The notes
are the source of truth. Before that check existed, `04_1` had one method against eight documented and
`05_1` was **zero bytes** while its notes carried four implementations, so a reader who cloned the repo
and ran the queue file got nothing at all.

No dependencies. Both scripts use only what ships with node.

## What was wrong, and is worth knowing

Three findings that survive as lessons rather than just fixes:

**The hash table's collision walk used `const` and reassigned it.** That throws
`TypeError: Assignment to constant variable.`, but only once the loop body runs, which needs a *third*
key in one bucket. The example added two. So a repository teaching collision handling had a collision
handler that broke on the second collision, with a demo one key short of showing it. `get` and `getAll`
in the same file already used `let`, so it was a slip rather than a misunderstanding.

**The queue's complexity table was wrong about the queue.** It claimed enqueue was `O(1)` and that "we
are always adding/removing to/from the END", while `add` uses `unshift`, which inserts at the beginning
and is `O(n)`. Measured, doubling n quadruples the total. Indexing an array is `O(1)`; inserting at one
is not, and the note had reasoned about the wrong operation.

**The timing wrappers measured the wrong thing.** Each `.js` file printed `Function took 1.8
milliseconds`, and all three printed roughly the same figure, because it was dominated by module load
and `console.log` rather than by the six insertions. A wall-clock number on a six-element example says
nothing about asymptotic behaviour, and printing one beside a Big O lesson misleads. Removed.

See [runtime complexity](./00_runtime-complexity.md), which states Big O against *these*
implementations rather than the textbook ideal: the tree does not rebalance, the hash function reads
only the first character, and the queue enqueues in linear time.

## License

MIT, per [LICENSE](./LICENSE). The badge and `package.json` previously disagreed with it.
