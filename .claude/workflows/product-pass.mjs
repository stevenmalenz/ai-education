export const meta = {
  name: 'product-pass',
  description: 'Run any new or reworked surface of The AI Kit through the full product team — CEO strategy, a student + instructor interview, a world-class copywriter, and a UX designer — then reconcile into one implementation-ready build spec. Hardwired to the AI Kit audience: U.S. college students (especially first-gen / no-connections) and the instructors who teach them; Big Tech is a sponsorship layer, never a co-equal audience.',
  phases: [
    { title: 'Strategy', detail: 'CEO sharpens the brief for the AI Kit audience, starts with why, kills jargon' },
    { title: 'Voice of customer', detail: 'simulated anxious student + time-poor instructor interviews (tone only)' },
    { title: 'Copy', detail: 'world-class copywriter drafts tight, jargon-free copy' },
    { title: 'UX', detail: 'UX sets IA, CTAs, and reuse of existing components' },
    { title: 'Build spec', detail: 'reconcile copy + UX into one implementation-ready spec' },
  ],
}

// ---- Inputs (via args) -----------------------------------------------------
// args.brief        : string  — what to build or change (required)
// args.targetFiles  : string[] — files the change touches (optional but recommended)
// args.researchPath : string  — verified research JSON (default: repo .aikit-work/research.json if present)
// args.constraintsPath : string — hard accuracy/integrity constraints (default: repo .aikit-work/CONSTRAINTS.md)
const A = args || {}
const BRIEF = A.brief || 'No brief provided — infer the most valuable improvement to the named target files for the AI Kit audience.'
const TARGETS = Array.isArray(A.targetFiles) ? A.targetFiles : (A.targetFiles ? [A.targetFiles] : [])
const RESEARCH = A.researchPath || '/Users/steven.male/ai-education/.aikit-work/research.json'
const CONSTRAINTS = A.constraintsPath || '/Users/steven.male/ai-education/.aikit-work/CONSTRAINTS.md'

const AUDIENCE = `THE AUDIENCE IS FIXED: U.S. college students — especially first-generation students and those without elite connections or campus AI access (the people the evidence says gain the most and currently get the least) — and the college instructors / professors who would run The AI Kit for them. Big Tech (Anthropic, Google, OpenAI, Microsoft, AWS) is a SPONSORSHIP LAYER (credits, funding, guest teachers), never a co-equal audience. Voice: plain-spoken, jargon-free, starts with WHY, honest about the AI-and-jobs fear then lands on agency ("be the person who uses AI well"). Every quote/stat that reaches a public page must carry a real, verified source URL — no invented testimonials or metrics.`

const PREP = `Use the Read tool FIRST to read, in full:
- ${CONSTRAINTS} (hard accuracy + integrity rules — non-negotiable; skip only if it does not exist)
- ${RESEARCH} (verified research bank: result.brief + result.verified; skip only if it does not exist)
${TARGETS.length ? '- the target files:\n' + TARGETS.map((f) => '  - ' + f).join('\n') : '- (no target files were named; ask the orchestrator to name them, or infer from the brief)'}

THE BRIEF: ${BRIEF}

${AUDIENCE}`

const SUFFIX = `\n\nYOUR ONLY DELIVERABLE is a single call to the StructuredOutput tool populated per the schema. Do NOT end your turn with prose, markdown, or a transcript — if you do, the run fails. Read what you need, think, then call StructuredOutput.`

const STRATEGY_SCHEMA = {
  type: 'object',
  properties: {
    onePhraseWhy: { type: 'string' },
    positioningForThisChange: { type: 'string' },
    pillars: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, idea: { type: 'string' }, proof: { type: 'string' } } } },
    cutList: { type: 'array', items: { type: 'string' } },
    voiceAndTone: { type: 'string' },
    successCriteria: { type: 'array', items: { type: 'string' } },
  },
  required: ['onePhraseWhy', 'positioningForThisChange', 'pillars', 'cutList'],
}
const VOC_SCHEMA = {
  type: 'object',
  properties: {
    persona: { type: 'string' },
    topFears: { type: 'array', items: { type: 'string' } },
    topDesires: { type: 'array', items: { type: 'string' } },
    objections: { type: 'array', items: { type: 'object', properties: { objection: { type: 'string' }, whatOvercomesIt: { type: 'string' } } } },
    wordsThatResonate: { type: 'array', items: { type: 'string' } },
    jargonThatRepels: { type: 'array', items: { type: 'string' } },
    theOneThing: { type: 'string' },
  },
  required: ['persona', 'topFears', 'topDesires', 'objections', 'theOneThing'],
}
const SECTION = {
  type: 'object',
  properties: {
    sectionId: { type: 'string' },
    action: { type: 'string', enum: ['keep', 'rewrite', 'reframe', 'merge', 'cut', 'new'] },
    eyebrow: { type: 'string' }, headline: { type: 'string' }, body: { type: 'string' },
    bullets: { type: 'array', items: { type: 'string' } },
    quotes: { type: 'array', items: { type: 'object', properties: { text: { type: 'string' }, attribution: { type: 'string' }, sourceUrl: { type: 'string' } }, required: ['text', 'attribution', 'sourceUrl'] } },
    stats: { type: 'array', items: { type: 'object', properties: { value: { type: 'string' }, label: { type: 'string' }, sourceUrl: { type: 'string' } }, required: ['value', 'label', 'sourceUrl'] } },
    ctas: { type: 'array', items: { type: 'object', properties: { label: { type: 'string' }, href: { type: 'string' } } } },
    implementationNote: { type: 'string' },
  },
  required: ['sectionId', 'action'],
}
const COPY_SCHEMA = {
  type: 'object',
  properties: { sections: { type: 'array', items: SECTION }, jargonRemoved: { type: 'array', items: { type: 'object', properties: { from: { type: 'string' }, to: { type: 'string' } } } } },
  required: ['sections'],
}
const UX_SCHEMA = {
  type: 'object',
  properties: {
    sectionOrder: { type: 'array', items: { type: 'string' } },
    changes: { type: 'array', items: { type: 'object', properties: { section: { type: 'string' }, action: { type: 'string' }, detail: { type: 'string' }, cssClasses: { type: 'string' } }, required: ['section', 'action', 'detail'] } },
    ctaStrategy: { type: 'string' },
    accessibility: { type: 'array', items: { type: 'string' } },
  },
  required: ['changes', 'ctaStrategy'],
}
const BUILDSPEC_SCHEMA = {
  type: 'object',
  properties: {
    summary: { type: 'string' },
    sections: { type: 'array', items: SECTION },
    globalChanges: { type: 'array', items: { type: 'string' } },
    openItemsForHuman: { type: 'array', items: { type: 'string' } },
  },
  required: ['summary', 'sections', 'openItemsForHuman'],
}

phase('Strategy')
const strategy = await agent(`You are the FOUNDER/CEO of The AI Kit — visionary, ruthless about focus, allergic to jargon. ${PREP}

Sharpen this brief into a strategy that starts with WHY, speaks only to the fixed audience, and (where the change is public-facing) defuses the AI-and-jobs fear with verified evidence. Deliver the one-phrase why, a positioning line for THIS change, 3-4 pillars (each with the research proof point that backs it, drawn from the research bank), a cut list of anything off-audience or jargon-y, and the voice & tone.${SUFFIX}`, { schema: STRATEGY_SCHEMA, label: 'ceo-strategy' })

phase('Voice of customer')
const voc = await parallel([
  () => agent(`You are a sharp UX user-researcher producing a voice-of-customer profile. ${PREP}

Privately imagine interviewing an anxious, ambitious U.S. college student (first-gen, no connections) affected by this change, grounding their imagined answers in the verified student sentiment in the research bank. Then DISTILL it into the profile fields. illustrative lines are TONE REFERENCE ONLY — never used on the site as testimonials.${SUFFIX}`, { schema: VOC_SCHEMA, phase: 'Voice of customer', label: 'interview:student' }),
  () => agent(`You are a sharp UX user-researcher producing a voice-of-customer profile. ${PREP}

Privately imagine interviewing a time-poor U.S. college instructor who would run this for their students, grounding their imagined answers in the verified educator sentiment in the research bank. Then DISTILL it into the profile fields. illustrative lines are TONE REFERENCE ONLY — never a site testimonial.${SUFFIX}`, { schema: VOC_SCHEMA, phase: 'Voice of customer', label: 'interview:instructor' }),
])

phase('Copy')
const copy = await agent(`You are a WORLD-CLASS conversion copywriter (Ogilvy's clarity, Basecamp's plain punch). ${PREP}

CEO strategy: ${JSON.stringify(strategy)}
Voice-of-customer: ${JSON.stringify(voc.filter(Boolean))}

Draft the copy for this change, section by section, mapped to the real ids/structure in the target files. Start with why, keep it TIGHT (cut every spare word — concision is a hard requirement), kill jargon (log each removal in jargonRemoved), and weave in only REAL attributed quotes/stats from the research bank (each with its sourceUrl). Never invent metrics or testimonials.${SUFFIX}`, { schema: COPY_SCHEMA, label: 'copywriter' })

phase('UX')
const ux = await agent(`You are a WORLD-CLASS product/UX designer. ${PREP}

New copy: ${JSON.stringify(copy)}
CEO strategy: ${JSON.stringify(strategy)}

Decide information architecture, section order, and CTA strategy for this change, REUSING the existing component classes already in the target files (no big CSS rewrites). Call out accessibility must-dos. Be concrete about which existing classes/markup to reuse.${SUFFIX}`, { schema: UX_SCHEMA, label: 'ux' })

phase('Build spec')
const spec = await agent(`You are the lead implementation editor. Reconcile the copy and UX into ONE implementation-ready build spec for an engineer who will hand-edit the target files, reusing existing classes. ${PREP}

CEO strategy: ${JSON.stringify(strategy)}
Copy: ${JSON.stringify(copy)}
UX: ${JSON.stringify(ux)}

Return final sections in render order (each with action + final copy + exact existing classes to reuse in implementationNote), globalChanges, and openItemsForHuman (every accuracy caveat + anything a human must confirm). Every quote/stat MUST keep its real sourceUrl. Honor all constraints.${SUFFIX}`, { schema: BUILDSPEC_SCHEMA, label: 'build-spec' })

return { strategy, voc: voc.filter(Boolean), copy, ux, spec }
