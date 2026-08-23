# Runtime complexity

Big O for the structures in this repository, stated against **these implementations** rather than
against the textbook ideal. That distinction is the point of the page: a data structure's complexity is
a property of how it is built, not of its name, and two of the implementations here are slower than
their labels suggest.

Every number below was either derived from the code in these notes or measured. Where it was measured,
the measurement is shown.

## The queue's enqueue is O(n), not O(1)

`05_0` enqueues with `unshift`, which inserts at index 0 and therefore moves every existing element up
one position. That is linear in the length of the queue, so filling a queue of n items is O(n squared).

Measured on node 24, n `unshift` calls against n `push` calls:

```text
n=20000   unshift  18.6 ms    push  0.4 ms
n=40000   unshift  95.4 ms    push  1.6 ms
n=80000   unshift 400.9 ms    push  0.8 ms
```

Doubling n roughly quadruples the `unshift` total, which is the signature of a linear per-call cost.
`push` stays flat. Those are one run and the absolute figures move a few percent between runs; the
ratio and the shape are the claim, not the milliseconds.

This matters because `05_0` used to claim the opposite, and the reasoning it gave was about the wrong
operation: indexing an array (`arr[0]`, `arr[arr.length - 1]`) genuinely is O(1), but the queue does not
index to enqueue, it `unshift`s. Reading a position and inserting at one have nothing in common.

The fix, if you wanted an O(1) queue on an array, is to enqueue with `push` and dequeue with a moving
head index rather than `shift`, so neither operation reindexes. That is not what these notes implement,
and the honest table is the one below.

## The hash table degrades to a linked list per letter

`03_0` hashes on the first character only, into 26 buckets. Its own comment says so: "This IS not
hashing". The consequence is worth spelling out in complexity terms, because it is the difference
between a hash table and a list of lists:

- Keys are distributed by first letter, not by content, so `apple`, `avocado` and `anchor` all land in
  bucket 0 and form a chain.
- Lookup is O(1) to find the bucket, then O(k) to walk the chain, where k is the number of stored keys
  sharing that first letter.
- With keys drawn from real text, first letters are famously uneven, so k is not n/26.

So the average case is O(n) in the number of same-letter keys, and the structure only behaves like a
hash table when the keys happen to start with different letters. A real hash function over the whole key
is what buys the O(1) average, and swapping one in is the single change that would most improve this
implementation.

## The binary search tree has no balancing

`02_0` inserts by comparison and never rebalances. Every operation is O(h) where h is the height, and h
depends entirely on insertion order:

- Random or interleaved input gives h around log n, so O(log n).
- **Sorted** input gives a tree with one child per node, h equals n, and every operation becomes O(n).
  The structure is then a linked list that costs more memory.

The example in the notes inserts `[50, 100, 40, 12, 90, 98]`, which interleaves and produces a
reasonable shape. Insert `[12, 40, 50, 90, 98, 100]` instead and you get a right spine. Nothing in the
code prevents that, which is what self-balancing trees (AVL, red-black) exist for.

## Table

Against the implementations in this repository, not the ideal ones.

| structure | operation | this implementation | why |
| --- | --- | --- | --- |
| Binary search tree | insert, search | O(h): O(log n) balanced, **O(n) if input is sorted** | no rebalancing |
| Hash table | insert, lookup | O(1) + O(k) chain walk, **O(n) same-letter keys** | hashes on the first character only |
| Doubly linked list | add head, add tail | O(1) | both ends are held |
| Doubly linked list | search by value or index | O(n) | no index, must walk |
| Doubly linked list | remove head, remove tail | O(1) | `prev` pointers make the tail cheap |
| Queue (array) | enqueue | **O(n)** | `unshift` reindexes |
| Queue (array) | dequeue | O(1) | `pop` from the end |
| Stack (array) | push, pop | O(1) amortised | both at the end |

"Amortised" on the stack is doing real work: a `push` that grows the backing array copies it, which is
O(n) for that one call, and the doubling strategy makes the average across many pushes constant.

## What Big O does not tell you

Two things worth holding onto, because this repository's own code demonstrates both.

**It hides constants, and constants decide small cases.** The `unshift` numbers above are all "linear",
and 18 ms against 400 ms is the difference between usable and not.

**It describes growth, not a measurement.** The `.js` files in this repository used to print
`Function took 1.8 milliseconds` after each demo. Three different structures all reported about 1.8 ms,
because that figure was dominated by module load and `console.log`, not by the six insertions being
demonstrated. A wall-clock number on a six-element example says nothing about asymptotic behaviour, and
printing one next to a lesson about Big O actively misleads. Those timers were removed.
