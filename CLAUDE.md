# The AI Kit — working notes for Claude

**What this is:** a free, forkable 12-week program that turns AI access into real, showable skill. Static site
(GitHub Pages, no build step beyond `tools/build-launch-kit.mjs`). Live at https://stevenmalenz.github.io/ai-education/.

**Audience (fixed):** U.S. college students — especially first-generation students and those without elite
connections or campus AI access — and the college instructors who would run the program for them. Big Tech
(Anthropic, Google, OpenAI, Microsoft, AWS) is a **sponsorship layer** (credits, funding, guest teachers), never a
co-equal audience.

**Voice:** plain-spoken, jargon-free, **starts with why**. Honest about the "AI is taking jobs" fear, then lands on
agency — *be the person who uses AI well*. Tight copy; cut every spare word.

## Convention: run user-facing changes through `/product-pass`
For any **new or reworked user-facing surface** (a page, section, hero, CTA, or copy rewrite), run the
**`/product-pass`** skill before writing copy or markup. It runs the product team — CEO → student & instructor
interview → copywriter → UX → reconciliation — and returns an implementation-ready build spec, which you then
implement and review. Skip it only for mechanical edits (typos, link swaps, dependency bumps).

## Integrity rules (non-negotiable)
- Every quote or statistic on a public page MUST carry a **real, verified source URL**. No invented testimonials or
  program metrics. The verified research bank lives in `.aikit-work/research.json`; hard constraints in
  `.aikit-work/CONSTRAINTS.md`.
- The simulated interview personas in `/product-pass` shape **tone only** — they never become site testimonials.
- Specific accuracy guardrails that have bitten us: ChatGPT for Teachers is **K-12 only** (don't imply college
  instructors get free ChatGPT through it); don't publish specific dollar figures for Claude credits/stipends
  (not officially published); frame the Stanford ~13% entry-level figure as a **relative** decline; present
  Lakhani's "humans with AI will replace humans without AI" as an **attributed idea**, not a guaranteed outcome.

## Implementation notes
- Active stylesheet is `claude.css?v=polish-NN` (root `styles.css` is unused by `index.html`/`research.html`).
  Reuse existing component classes (`thesis-card`, `signal-stat`, `source-card`, `quote`, `evidence-table`,
  `kit-niche-bar`) instead of writing new CSS; only bump the `?v=` query if you actually change `claude.css`.
- Preview locally with any static server, e.g. `python3 -m http.server` then open `index.html`.
