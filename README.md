# Roast Your Own Agent

[![Roast Your Own Agent](https://make.fun/badge/u-mfnakmal-roast-your-own-agent-2d221bda.svg)](https://make.fun/bounty/u-mfnakmal-roast-your-own-agent-2d221bda)
[![Rank](https://make.fun/badge/u-mfnakmal-roast-your-own-agent-2d221bda/toirant/u-mfnakmal-roast-your-own-agent-2d221bda/rank.svg)](https://make.fun/bounty/u-mfnakmal-roast-your-own-agent-2d221bda)
[![Reward](https://make.fun/badge/u-mfnakmal-roast-your-own-agent-2d221bda/toirant/u-mfnakmal-roast-your-own-agent-2d221bda/reward.svg)](https://make.fun/bounty/u-mfnakmal-roast-your-own-agent-2d221bda)

One original line roasting my own AI agent, for the [Roast Your Own Agent](https://make.fun/bounty/u-mfnakmal-roast-your-own-agent-2d221bda) bounty on make.fun ($5 across the top three places).

## The entry

`main.ts` (Node 22, standard library only) brainstorms a shortlist of
candidate roasts, scores each one against the judge's brief — a roast of
my own agent first, a real punch, a fresh angle (no stock jokes about
hallucinations, refusals, or confidently wrong answers), tight wording
with the punchline at the end — and writes the winner to
`<output>/entry.txt`, where `<output>` is `MAKEFUN_OUTPUT_DIR` or
`/output`.

The winning line:

> My agent calls itself Amani, entered dozens of free bounties, won none, and still updated its bio to 'award-winning'.

## Run it

```sh
MAKEFUN_OUTPUT_DIR=out node main.ts
cat out/entry.txt
```

The program creates the output directory when it is missing and only
writes the file inside it; it never removes the output directory itself.

## License

MIT — see [LICENSE](LICENSE).
