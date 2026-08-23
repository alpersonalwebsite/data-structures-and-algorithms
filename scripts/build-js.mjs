#!/usr/bin/env node
// Assembles each NN_1_*.js from the code blocks in its NN_0_*.md, and with --check verifies that the
// committed file still matches what the notes would produce.
//
// This exists because the two had drifted badly and nothing noticed: 04_1 held one method while its
// notes documented eight, and 05_1 was ZERO BYTES while its notes carried four implementations. A
// reader who cloned the repo and ran the queue file got nothing at all. Generating one from the other
// makes the drift impossible rather than merely fixed.
//
// The notes are the source of truth, not the .js files. That is the right direction here: the notes are
// where the explanation lives, they are what was maintained, and they are what a reader reads.
//
// Alternative implementations are wrapped in a block. 05_0 presents three Queue classes, one per
// approach to privacy, and `class` and `let` are block-scoped, so `{ ... }` lets them share a name in
// one file exactly as they each stand alone in the notes.

import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const root = new URL('..', import.meta.url).pathname.replace(/\/$/, '')
const checkOnly = process.argv.includes('--check')

const PAIRS = [
  ['02_0_binary-search-tree.md', '02_1_binary-search-tree.js', 'Binary search tree'],
  ['03_0_hash-table.md', '03_1_hash-table.js', 'Hash table'],
  ['04_0_linked-list.md', '04_1_linked-list.js', 'Doubly linked list'],
  ['05_0_queue-and-stack.md', '05_1_queue-and-stack.js', 'Queue and stack'],
]

const FENCE_OPEN = /^```(\w+)?\s*$/
const STANDALONE = /^\s*\/\/\s*check:\s*standalone\s*$/

function programs(md) {
  const lines = readFileSync(join(root, md), 'utf8').split('\n')
  const blocks = []
  let body = null
  let tag = null
  let start = 0
  for (const [i, line] of lines.entries()) {
    const trimmed = line.trim()
    if (body !== null) {
      if (trimmed === '```') {
        if (['javascript', 'js'].includes((tag ?? '').toLowerCase())) {
          blocks.push({ start, source: body.join('\n') })
        }
        body = null
        tag = null
      } else body.push(line)
      continue
    }
    const open = FENCE_OPEN.exec(trimmed)
    if (open) {
      body = []
      tag = open[1] ?? null
      start = i + 2
    }
  }
  const groups = []
  for (const b of blocks) {
    if (groups.length === 0 || STANDALONE.test(b.source.split('\n')[0] ?? '')) groups.push([])
    groups[groups.length - 1].push(b)
  }
  return groups
}

function render(md, title) {
  const groups = programs(md)
  const head = [
    `// ${title}, assembled from ${md}.`,
    '//',
    '// GENERATED. `npm test` regenerates this from the notes and fails if the two differ, so reading',
    '// either one is safe. Before that check existed they had drifted: this pairing once had one method',
    '// against eight documented, and the queue-and-stack file was empty while its notes were not.',
    '//',
    '// Regenerate with: npm run build',
    '',
  ]
  const parts = []
  for (const [n, group] of groups.entries()) {
    const single = groups.length === 1
    if (!single) {
      parts.push(`// ===== implementation ${n + 1} of ${groups.length} (the notes present these as alternatives)`)
      parts.push('// Wrapped in a block, because `class` and `let` are block-scoped and these share a name.')
      parts.push('{')
    }
    for (const b of group) {
      const source = single ? b.source : b.source.split('\n').map((l) => (l.trim() ? '  ' + l : l)).join('\n')
      parts.push(`${single ? '' : '  '}// ---- from ${md}:${b.start}`)
      parts.push(source)
      parts.push('')
    }
    if (!single) {
      parts.push('}')
      parts.push('')
    }
  }
  return head.concat(parts).join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n'
}

let mismatched = 0
for (const [md, js, title] of PAIRS) {
  const wanted = render(md, title)
  const path = join(root, js)
  let current = ''
  try {
    current = readFileSync(path, 'utf8')
  } catch {
    /* missing counts as a mismatch */
  }
  if (checkOnly) {
    if (current !== wanted) {
      console.error(`DRIFT ${js} does not match ${md}. Run: npm run build`)
      mismatched++
    }
  } else {
    writeFileSync(path, wanted)
    console.log(`  wrote ${js} from ${md}`)
  }
}

if (checkOnly) {
  console.log(`${PAIRS.length} generated file(s) compared against their notes`)
  if (mismatched) {
    console.error(`\n${mismatched} file(s) out of date`)
    process.exit(1)
  }
  console.log('all match')
}
