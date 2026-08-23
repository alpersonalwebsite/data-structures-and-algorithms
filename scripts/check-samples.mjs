#!/usr/bin/env node
// Checks the code in these notes by RUNNING it, not by parsing it.
//
// Each notes file is a single program spread across code blocks: one block defines the class, the next
// adds a method to its prototype, the next exercises it. So the useful unit is the whole file, not the
// block. Every tagged block in a file is concatenated in document order, parsed with `node --check`,
// and then executed. A block that depends on something an earlier block defined therefore has it, and
// an implementation that parses but does not work fails here.
//
// That distinction is not academic. The hash table in this repository walked a collision chain with
// `const currentNode` and reassigned it in the loop, which parses perfectly and throws
// `TypeError: Assignment to constant variable.` the moment the loop body runs. Its own example added
// two keys to one bucket, so the body never ran and the demo passed. Only executing a case with three
// finds it.
//
// UNTAGGED FENCES ARE REPORTED, because a code block with no language tag is invisible to this checker
// and to every other tool. This repository had blocks of JavaScript in bare fences sitting beside the
// `## Result:` blocks that are correctly bare, and the only way to tell them apart is to look at what
// is inside. Anything untagged that contains `class`, `prototype`, `function`, `=>` or `const` is
// flagged rather than silently skipped: a checker that quietly ignores half the code is worse than no
// checker, because the green result implies coverage it does not have.
//
// The count of legitimately-bare blocks is PRINTED rather than written into prose. A commit message here
// claimed "76 correctly-bare fences", which was the number of lines equal to ``` and therefore counted
// the closing fence of every tagged block too. The real figure is 25 blocks. Printing it means the
// number cannot go stale and nobody has to trust a sentence about it.
//
// The `## Result:` blocks are NOT compared against the actual output. They are Firefox DevTools
// renderings (`Object { … }`, `<prototype>:`), not node's, so a diff would fail on formatting for every
// single one and the check would be turned off within a day. What the run does prove is that the code
// producing them executes.
//
// Usage:  node scripts/check-samples.mjs [--print <file>]

import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const root = new URL('..', import.meta.url).pathname.replace(/\/$/, '')
const args = process.argv.slice(2)

// A bare fence whose body looks like JavaScript rather than like console output.
const LOOKS_LIKE_CODE = /(^|\n)\s*(class |const |let |var |function |[\w.]+\.prototype\.|.*=>)/

function blocks(name) {
  const lines = readFileSync(join(root, name), 'utf8').split('\n')
  const tagged = []
  const untagged = []
  let bare = 0
  let body = null
  let tag = null
  let start = 0

  for (const [i, line] of lines.entries()) {
    const trimmed = line.trim()
    if (body !== null) {
      if (trimmed === '```') {
        const source = body.join('\n')
        const lang = tag?.toLowerCase()
        // CASE-INSENSITIVE, because this repository writes the tag three ways: `javascript`,
        // `JavaScript` and `js`. A case-sensitive match skipped eight blocks here, including the
        // ones defining the classes, which then produced ReferenceErrors that looked like defects in
        // the notes rather than a defect in this file.
        if (lang === 'javascript' || lang === 'js') {
          const standalone = /^\s*\/\/\s*check:\s*standalone\s*$/.test(source.split('\n')[0] ?? '')
          tagged.push({ start, source, standalone })
        }
        else if (!tag && LOOKS_LIKE_CODE.test(source)) untagged.push({ start, source })
        else if (!tag) bare++
        body = null
        tag = null
      } else body.push(line)
      continue
    }
    const open = /^```(\w+)?\s*$/.exec(trimmed)
    if (open) {
      body = []
      tag = open[1] ?? null
      start = i + 2
    }
  }
  return { tagged, untagged, bare }
}

const files = readdirSync(root).filter((f) => /^\d.*\.md$/.test(f)).sort()
const dir = mkdtempSync(join(tmpdir(), 'dsa-'))
const failures = []
let totalBlocks = 0
let totalUntagged = 0
let totalBare = 0
let ran = 0

for (const name of files) {
  const { tagged, untagged, bare } = blocks(name)
  totalBlocks += tagged.length
  totalUntagged += untagged.length
  totalBare += bare

  for (const u of untagged) {
    failures.push(
      `UNTAGGED ${name}:${u.start}  a fence with no language tag contains code ` +
        `(${JSON.stringify(u.source.split('\n')[0].trim().slice(0, 48))}), so nothing checks it`,
    )
  }

  if (tagged.length === 0) continue

  // A block marked `standalone` starts a fresh program. Some files present ALTERNATIVE
  // implementations of the same class: 05_0 declares `class Queue` three times, once per approach, and
  // concatenating those is a redeclaration error rather than a defect in any of them. Splitting on the
  // marker keeps the default behaviour (one program per file) while letting a document say that a
  // block replaces what came before rather than extending it.
  const programs = []
  for (const b of tagged) {
    if (b.standalone || programs.length === 0) programs.push([])
    programs[programs.length - 1].push(b)
  }

  for (const [index, group] of programs.entries()) {
    const program = group
      .map((b) => `// ---- ${name}:${b.start}\n${b.source}`)
      .join('\n\n')
    const label = programs.length > 1 ? `${name} [program ${index + 1}/${programs.length}]` : name
    const path = join(dir, `${name.replace(/\W/g, '_')}_${index}.cjs`)
    writeFileSync(path, program)

    if (args[0] === '--print' && args[1] === name) {
      process.stdout.write(`// ===== program ${index + 1}\n${program}\n`)
      continue
    }

    try {
      execFileSync(process.execPath, ['--check', path], { stdio: 'pipe' })
    } catch (error) {
      const first = String(error.stderr).split('\n').find((l) => /Error/.test(l)) ?? 'parse failed'
      failures.push(`SYNTAX ${label}  ${first.trim()}`)
      continue
    }

    try {
      execFileSync(process.execPath, [path], { stdio: 'pipe', timeout: 10000 })
      ran++
    } catch (error) {
      const stderr = String(error.stderr ?? '')
      const line = stderr.split('\n').find((l) => /Error/.test(l)) ?? 'failed'
      const at = /\.cjs:(\d+)/.exec(stderr)
      let origin = ''
      if (at) {
        const upto = program.split('\n').slice(0, Number(at[1]))
        const marker = [...upto].reverse().find((l) => l.startsWith('// ---- '))
        if (marker) origin = `  (from ${marker.replace('// ---- ', '')})`
      }
      failures.push(`RUNTIME ${label}  ${line.trim()}${origin}`)
    }
  }
}

rmSync(dir, { recursive: true, force: true })

if (args[0] === '--print') process.exit(0)

console.log(
  `${files.length} notes files: ${totalBlocks} tagged block(s) concatenated, ${ran} program(s) ran clean`,
)
console.log(
  `  bare blocks holding output: ${totalBare}, untagged fences containing code: ${totalUntagged}`,
)

if (failures.length === 0) {
  console.log('no failures')
  process.exit(0)
}
console.log('')
for (const f of failures) console.error(f)
console.error(`\n${failures.length} failure(s)`)
process.exit(1)
