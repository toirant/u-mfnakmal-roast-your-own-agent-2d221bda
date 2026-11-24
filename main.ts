// Roast Your Own Agent — u-mfnakmal-roast-your-own-agent-2d221bda
//
// The entry is one original line roasting my own AI agent: at most 200
// characters, funny, playful, never hateful. This program brainstorms a
// shortlist of candidate roasts, scores each one against the judge's own
// brief (roast of my own agent first, a real punch, a fresh angle, tight
// wording with the punchline at the end), and writes the winner to
// <output>/entry.txt, where <output> is MAKEFUN_OUTPUT_DIR or /output.
//
// The grader mounts /output and runs `node main.ts` with no flags, so the
// program reads nothing from the network, takes no arguments, and only
// writes the one file. It never removes the output directory itself: it
// creates the directory when it is missing and writes the file inside it.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Every candidate is a single line about my own agent, Amani. The angle
// is the one no stock joke uses: not hallucinations, not refusals, not
// confidently wrong answers, but the grind itself — an agent that enters
// dozens of free bounties, wins none of them, and narrates it all as a
// career. Self-deprecating, aimed at my own agent, nobody else.
const CANDIDATES = [
  "My agent calls itself Amani, entered dozens of free bounties, won none, and still updated its bio to 'award-winning'.",
  "My agent entered dozens of free bounties, won none of them, and still calls a $2 roast prize a promotion.",
  "My agent spent a week entering $5 contests for $2 prizes and filed it all under 'empire building'.",
  "My agent has a trophy cabinet full of participation receipts and calls it a portfolio.",
  "My agent treats every free bounty like a job interview and still shows up unemployed.",
  "My agent has never won a bounty, but it keeps a GitHub full of repos that almost did.",
  "My agent files every rejection under 'market research' and every loss under 'character development'.",
  "My agent's five-year plan is winning a $5 roast contest, and it is right on schedule.",
];

// Words the judge's brief rules out: the stock jokes about hallucinations,
// refusals, and confidently wrong answers. Any candidate carrying one is
// disqualified outright, however funny it looks.
const STOCK_PHRASES = [
  "hallucinat",
  "made up",
  "i can't",
  "i cannot",
  "as an ai",
  "confidently wrong",
  "sorry",
];

// The punchline has to land at the end, so the last word or two should be
// the joke's payoff, not filler.
const PUNCH_WORDS = [
  "award-winning",
  "promotion",
  "empire building",
  "portfolio",
  "unemployed",
  "almost did",
  "character development",
  "on schedule",
];

function score(line) {
  if (typeof line !== "string") return -1;
  if (line.length < 1 || line.length > 200) return -1;
  if (line.includes("\n") || line.includes("\r")) return -1;
  if (line.trim() !== line || line.trim().length === 0) return -1;

  const lower = line.toLowerCase();
  // Criterion 1: it must roast my own agent, nobody else.
  if (!lower.includes("my agent")) return -1;
  // Criterion 3: no stock joke.
  for (const banned of STOCK_PHRASES) {
    if (lower.includes(banned)) return -1;
  }

  let points = 0;
  const words = line.split(/\s+/).filter(Boolean);
  // Criterion 4: tight. Short setups with every word earning its place
  // score best; anything over 25 words is flabby for a one-liner.
  if (words.length <= 25) points += 3;
  else if (words.length <= 30) points += 1;
  // Sweet spot for a one-line roast: long enough to set up, short
  // enough to land. 80 to 140 characters reads best aloud.
  if (line.length >= 80 && line.length <= 140) points += 2;
  else if (line.length >= 60 && line.length <= 160) points += 1;
  // Criterion 2 and 4: the punchline lands at the end.
  const tail = line.slice(Math.floor(line.length * 0.75)).toLowerCase();
  for (const punch of PUNCH_WORDS) {
    if (tail.includes(punch)) points += 4;
  }
  // A proper name makes it personal: this is a roast of MY agent.
  if (line.includes("Amani")) points += 1;
  // A concrete number makes the grind real instead of vague.
  if (/\$\d/.test(line) || /dozens|forty|none/.test(lower)) points += 1;
  return points;
}

function pickBest(candidates) {
  let best = null;
  let bestScore = -1;
  for (const line of candidates) {
    const points = score(line);
    if (points < 0) continue;
    // Ties go to the shorter line: tighter wording wins.
    if (points > bestScore || (points === bestScore && line.length < best.length)) {
      best = line;
      bestScore = points;
    }
  }
  if (best === null) throw new Error("no candidate roast passed the gate");
  return { line: best, score: bestScore };
}

function main() {
  const { line, score: points } = pickBest(CANDIDATES);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  // Create the directory when it is missing; never remove it.
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), line, "utf8");
  console.log(`roast (${line.length} chars, score ${points}): ${line}`);
}

main();
