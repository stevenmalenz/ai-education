---
name: product-pass
description: >-
  Run any new or reworked user-facing surface of The AI Kit through the full product team — CEO strategy,
  a simulated student + instructor interview, a world-class copywriter, and a UX designer — grounded in the
  verified research, then implement and review. Use this for any new page, section, hero, CTA, or copy rewrite
  on the site (index.html, research.html, launch-kit, new pages). The audience is fixed: U.S. college students
  (especially first-gen / no-connections) and the instructors who teach them; Big Tech is a sponsorship layer.
---

# /product-pass — the AI Kit product pipeline

Turns a one-line brief into shipped, on-brand, research-backed copy for The AI Kit. It encodes the team that
built the homepage refocus: **CEO → student & instructor interviews → copywriter → UX → reconciliation**, then
**implement → adversarial review**.

## When to use
- A new page, section, hero, or CTA on the site.
- A copy rewrite of an existing surface.
- Any change where tone, persuasion, or audience fit matters.

Skip it for pure mechanical edits (typo fixes, link swaps, dependency bumps).

## How to run it

1. **Gather inputs** (ask the user only if unclear):
   - `brief` — what to build or change, in one or two sentences.
   - `targetFiles` — absolute paths the change touches (e.g. `/Users/steven.male/ai-education/index.html`).
2. **Make sure the research bank exists.** The flow reads `/Users/steven.male/ai-education/.aikit-work/research.json`
   and `.aikit-work/CONSTRAINTS.md`. If they are missing or stale and the change makes factual claims, run a
   research pass first (a fan-out web-research + adversarial-verification + synthesis workflow) and write the
   verified brief to `.aikit-work/research.json` before proceeding. Every quote/stat that reaches a public page
   MUST carry a real, verified source URL — no invented testimonials or metrics.
3. **Run the workflow:**
   ```
   Workflow({ name: "product-pass", args: { brief: "<brief>", targetFiles: ["<abs path>", ...] } })
   ```
   It returns `{ strategy, voc, copy, ux, spec }`. The `spec.sections` are implementation-ready (each names the
   existing claude.css classes to reuse); `spec.openItemsForHuman` lists anything a human must confirm.
4. **Review the spec with the user**, then **implement** the edits yourself (surgical Edits against the real
   files; reuse existing classes — avoid CSS version bumps).
5. **Run an adversarial review pass** (fact/constraint accuracy vs research, copy/jargon, front-end correctness,
   a11y/SEO), apply confirmed fixes, and report back with the open items only the user can confirm.

## Hard rules (the flow enforces these; you must too)
- Audience is fixed: college students + their instructors. Big Tech = sponsorship layer, not a co-equal audience.
- Start with **why**; cut jargon; keep copy tight.
- Be honest about the AI-and-jobs fear, then land on agency.
- Real, sourced quotes/stats only. The simulated interview personas shape **tone**, never become testimonials.
