import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const kitRoot = path.join(root, "launch-kit");
const v1 = path.join(kitRoot, "v1");
const templates = path.join(v1, "templates");
const downloads = path.join(kitRoot, "downloads");

for (const dir of [kitRoot, v1, templates, downloads]) {
  fs.mkdirSync(dir, { recursive: true });
}

const weeks = [
  {
    n: 0,
    phase: "Setup",
    title: "Cohort Setup and Baseline",
    feel: "Expected, welcomed, and unblocked.",
    promise: "Learners know where to go, what to bring, how to get help, and how success will be measured.",
    artifact: "Access plan, baseline survey, portfolio folder, cohort charter.",
    challenge: "Complete tool access, baseline survey, and a one-paragraph portfolio goal.",
    homework: "Bring one recurring task from work, school, job search, volunteering, caregiving, or community life.",
    prompts: [
      "What would make this cohort easier for you to participate in consistently?",
      "What work do you already do well that AI should not flatten or replace?",
      "What would you be proud to show at the end of 12 weeks?",
      "What private data, sensitive stories, or human decisions should stay out of AI tools?",
      "Write a note to your future self about what you hope changes by demo day.",
    ],
  },
  {
    n: 1,
    phase: "Readiness",
    title: "AI, Agency, and the Work Ahead",
    feel: "Respected, less alone, and allowed to be both skeptical and curious.",
    promise: "Learners can explain where AI helps, where it fails, and where human judgment remains necessary.",
    artifact: "Personal AI use statement.",
    challenge: "Ask an AI tool to explain a task you already know. Mark what is useful, shallow, wrong, and missing.",
    homework: "Draft a one-page AI use statement: what I will use AI for, what I will not use it for, and how I will disclose it.",
    prompts: [
      "Where is AI already touching your work or learning without being named?",
      "What is one thing you do that depends on judgment, care, taste, or context?",
      "Ask AI to explain a familiar task. What did it miss because it does not live your life?",
      "What would responsible AI use look like in your role or community?",
      "Write one sentence you would be comfortable saying to a manager about your AI use.",
    ],
  },
  {
    n: 2,
    phase: "Readiness",
    title: "Prompting as Work Design",
    feel: "Precise, capable, and less dependent on magic words.",
    promise: "Learners can turn vague requests into clear AI-assisted work briefs.",
    artifact: "Prompt pattern library.",
    challenge: "Rewrite three weak prompts into useful briefs using context, task, constraints, example, and review criteria.",
    homework: "Create four reusable prompts: draft, critique, summarize, and plan.",
    prompts: [
      "What context would a skilled coworker need before helping with this task?",
      "What should the AI produce, and what should it avoid doing?",
      "What example can you provide so the output matches your world?",
      "What review checklist would make the output safer to use?",
      "Save one prompt you can reuse next week, then explain why it works.",
    ],
  },
  {
    n: 3,
    phase: "Readiness",
    title: "Verification and Source Discipline",
    feel: "Careful, not paranoid.",
    promise: "Learners can check factual claims, mark uncertainty, and decide when not to use AI.",
    artifact: "Verification checklist.",
    challenge: "Have AI summarize a public article, then compare the output to the source and correct errors.",
    homework: "Build a five-step verification checklist for your role track.",
    prompts: [
      "Which claims in this output could hurt someone if wrong?",
      "What source would you trust more than the model?",
      "Ask AI to list what it is uncertain about. What did it admit, and what did it hide?",
      "Rewrite the answer with citations, caveats, and a human review note.",
      "Name one task this week where AI is not appropriate.",
    ],
  },
  {
    n: 4,
    phase: "Practice",
    title: "Workflow Mapping",
    feel: "Grounded in real work, not tool demos.",
    promise: "Learners can map a recurring workflow and identify safe opportunities for AI assistance.",
    artifact: "Workflow map and risk notes.",
    challenge: "Map one recurring workflow with inputs, steps, decisions, handoffs, risks, and outputs.",
    homework: "Interview one person who knows the workflow and add what they need to trust the result.",
    prompts: [
      "What happens before this task starts?",
      "Where does the work slow down, repeat, or depend on memory?",
      "Which step needs human approval no matter how good the AI output is?",
      "What data should be removed, redacted, or avoided?",
      "What would count as a meaningful improvement without pretending the work is solved?",
    ],
  },
  {
    n: 5,
    phase: "Practice",
    title: "Role Lab: Communication and Operations",
    feel: "More fluent, organized, and still in their own voice.",
    promise: "Learners can use AI to draft, revise, summarize, and organize without losing accountability.",
    artifact: "Operations workflow card.",
    challenge: "Convert messy notes into an action summary with owners, dates, open questions, and risks.",
    homework: "Create one reusable communication template and test it with a peer.",
    prompts: [
      "What does the reader need to do after reading this?",
      "Ask AI to make this clearer without making it colder.",
      "What decision, owner, deadline, or open question is missing?",
      "Rewrite the message for a stressed reader with limited time.",
      "What would you disclose about AI assistance before sending this?",
    ],
  },
  {
    n: 6,
    phase: "Practice",
    title: "Role Lab: Data, Research, and Decisions",
    feel: "Analytical, source-aware, and humble.",
    promise: "Learners can structure messy information and produce decision support with caveats.",
    artifact: "Evidence memo.",
    challenge: "Compare three options for a real decision and document what still needs human review.",
    homework: "Create a one-page decision memo using at least three trusted sources.",
    prompts: [
      "What question are we actually trying to answer?",
      "Ask AI to make a comparison table, then remove unsupported claims.",
      "What would change your recommendation?",
      "What source is missing from this analysis?",
      "Write a decision memo with assumptions, caveats, and next steps.",
    ],
  },
  {
    n: 7,
    phase: "Practice",
    title: "Accessibility and Inclusion by Default",
    feel: "Responsible for usefulness across difference.",
    promise: "Learners can improve readability, accessibility, and inclusion in AI-assisted work.",
    artifact: "Inclusive use review.",
    challenge: "Revise one document for plain language, screen reader structure, and multiple reading levels.",
    homework: "Run an inclusion review with one person who is not like you.",
    prompts: [
      "Who is likely to be excluded by this output?",
      "Ask AI to explain this at three reading levels. Which one is most useful?",
      "What language, disability, culture, or context assumptions are present?",
      "Rewrite the artifact for a person using a phone with limited time.",
      "What test would prove this is actually more accessible?",
    ],
  },
  {
    n: 8,
    phase: "Practice",
    title: "Automation with Guardrails",
    feel: "Powerful and cautious.",
    promise: "Learners can distinguish assistive AI from delegated automation and design human review points.",
    artifact: "Guardrail plan.",
    challenge: "Design a low-risk automation and explain where humans remain in the loop.",
    homework: "Write do-not-automate rules for your portfolio workflow.",
    prompts: [
      "What part of this workflow should AI assist but not decide?",
      "Where is the approval point?",
      "Where is the reversal point if something goes wrong?",
      "Who is harmed if this automation fails?",
      "Write a guardrail plan a manager could understand in five minutes.",
    ],
  },
  {
    n: 9,
    phase: "Portfolio",
    title: "Portfolio Sprint One",
    feel: "Focused on a real user and a small useful build.",
    promise: "Learners can define a portfolio project with user, problem, baseline, desired state, and constraints.",
    artifact: "Project brief and first prototype.",
    challenge: "Build the smallest useful AI-assisted version of the workflow.",
    homework: "Test the prototype with one stakeholder and capture notes.",
    prompts: [
      "Who is the user, and what pressure are they under?",
      "What is the smallest useful version of this improvement?",
      "What should the prototype not attempt yet?",
      "Ask AI to critique the project brief from the user's point of view.",
      "What feedback would make you change direction?",
    ],
  },
  {
    n: 10,
    phase: "Portfolio",
    title: "Portfolio Sprint Two",
    feel: "Evidence-driven and ready to improve.",
    promise: "Learners can test, revise, and document before-and-after evidence.",
    artifact: "Test notes and before/after evidence.",
    challenge: "Run two tests: one quality test and one usefulness test.",
    homework: "Revise the prototype and update the implementation guide.",
    prompts: [
      "What did the first test reveal that you did not expect?",
      "What quality bar should this meet before anyone relies on it?",
      "Ask AI to generate edge cases, then test the prototype against them.",
      "What changed in time, quality, access, or confidence?",
      "What should a future learner know before copying this?",
    ],
  },
  {
    n: 11,
    phase: "Portfolio",
    title: "Story, Demo, and Role Pathway",
    feel: "Able to explain capability without hype.",
    promise: "Learners can tell the story honestly and connect the work to a role pathway.",
    artifact: "Demo script, role brief, and portfolio narrative.",
    challenge: "Deliver a five-minute demo that includes what worked, what failed, and what should stay human.",
    homework: "Record a practice demo and request feedback from a peer.",
    prompts: [
      "What is the simplest honest story of your project?",
      "What should you say before showing the AI-assisted part?",
      "What failure, limitation, or risk should you name out loud?",
      "Ask AI to turn your project into a role brief, then make it more specific.",
      "What next opportunity does this work prepare you for?",
    ],
  },
  {
    n: 12,
    phase: "Portfolio",
    title: "Demo Day and Next Cohort Handoff",
    feel: "Proud, seen, and connected to what comes next.",
    promise: "Learners graduate with proof, feedback, and a named next step.",
    artifact: "Final portfolio, public share post, and next-step plan.",
    challenge: "Publish or privately share the portfolio with a clear disclosure and ask.",
    homework: "Update the local playbook with one thing the next cohort should inherit.",
    prompts: [
      "What are you proud of that was hard to learn?",
      "What should stay human in your workflow?",
      "What do you want a hiring manager, teacher, or partner to notice?",
      "Write a public share post that is specific, humble, and useful.",
      "What is the next smallest step after graduation?",
    ],
  },
];

const progression = [
  [
    "Chat",
    "Use an AI assistant in conversation to think, draft, critique, summarize, compare, role-play, and learn.",
    "Learner can write context-rich prompts, ask follow-ups, verify outputs, and explain what changed.",
  ],
  [
    "Skill",
    "Turn a useful chat pattern into a reusable work skill: prompt, checklist, source pack, examples, rubric, and disclosure rule.",
    "Another person can run the same skill and get a useful, reviewable result.",
  ],
  [
    "Agent",
    "Wrap a proven skill in a bounded loop with a trigger, inputs, tools, memory or state, guardrails, tests, and human approval.",
    "The agent handles a narrow recurring task, produces logs, asks for help when uncertain, and never makes high-stakes decisions alone.",
  ],
];

const projectBank = [
  {
    track: "Community college",
    title: "Advisor follow-up assistant",
    chat: "Turn advising notes into a plain-language next-step plan.",
    skill: "Reusable advising follow-up skill with source links to catalog pages, checklist, and advisor review.",
    agent: "After each approved advising note is added, draft a follow-up email and flag missing policy links for human review.",
    inputs: "Synthetic advising notes, public catalog pages, redacted appointment notes.",
    success: "Plan is readable, source-linked, and approved by an advisor in under five minutes.",
    guardrail: "No degree, financial aid, or immigration decision is automated.",
  },
  {
    track: "Workforce",
    title: "Job posting fit mapper",
    chat: "Compare a learner resume to three job posts and identify skill gaps.",
    skill: "Role-fit skill that extracts requirements, maps evidence, and creates a learning plan.",
    agent: "Monitor saved postings weekly and add promising roles to a tracker with fit score and missing evidence.",
    inputs: "Public job posts, learner-approved resume, portfolio links.",
    success: "Learner can explain fit, gaps, and next action without inflated claims.",
    guardrail: "Agent never applies, messages employers, or changes resume without approval.",
  },
  {
    track: "Library",
    title: "Program planning assistant",
    chat: "Brainstorm a workshop plan for a local audience.",
    skill: "Program planning skill with audience profile, accessibility checklist, budget, materials, and run of show.",
    agent: "Create draft event pages and supply lists from approved program briefs.",
    inputs: "Past event descriptions, room constraints, public calendar, accessibility defaults.",
    success: "Program staff can approve or revise a complete event plan faster.",
    guardrail: "No public posting until staff approval.",
  },
  {
    track: "Nonprofit",
    title: "Grant opportunity triage",
    chat: "Summarize one grant opportunity and list fit, requirements, and concerns.",
    skill: "Grant triage skill with eligibility checklist, deadline plan, and source-grounded summary.",
    agent: "Check a trusted list weekly and add matching grants to a review queue.",
    inputs: "Public grant pages, organization mission, prior program descriptions.",
    success: "Staff can decide pursue or pass within 15 minutes.",
    guardrail: "Agent never submits, signs, or invents eligibility claims.",
  },
  {
    track: "Small business",
    title: "Customer feedback signal report",
    chat: "Cluster customer comments into themes with examples.",
    skill: "Feedback analysis skill that tags comments, identifies friction, and proposes owner actions.",
    agent: "Create a weekly draft feedback report from approved review exports.",
    inputs: "Public reviews, survey exports, redacted support notes.",
    success: "Report identifies top themes, evidence, and next actions.",
    guardrail: "No private customer data in public tools.",
  },
  {
    track: "Healthcare adjacent",
    title: "Public resource navigator",
    chat: "Turn public clinic or benefits information into plain-language guidance.",
    skill: "Resource navigator skill with source links, eligibility caveats, and escalation instructions.",
    agent: "Draft updated resource summaries when approved public pages change.",
    inputs: "Public health department pages, clinic hours, service directories.",
    success: "Information is clearer, dated, linked, and easy to review.",
    guardrail: "No diagnosis, treatment, insurance, or eligibility decision.",
  },
  {
    track: "Civic services",
    title: "Plain-language city services explainer",
    chat: "Explain a city service page in plain language.",
    skill: "Plain-language rewrite skill with reading-level check, multilingual draft, and source link.",
    agent: "Queue updated explainers when source pages change.",
    inputs: "Public city pages, style guide, translation review path.",
    success: "Resident-facing explainer is accurate, accessible, and source-linked.",
    guardrail: "Human bilingual or subject-matter review before publishing.",
  },
  {
    track: "Operations",
    title: "Meeting-to-actions system",
    chat: "Turn meeting notes into owners, decisions, risks, and follow-ups.",
    skill: "Meeting action skill with decision log, open questions, and follow-up template.",
    agent: "After notes are dropped into a folder, draft recap and update action tracker.",
    inputs: "Non-sensitive notes, project tracker, team glossary.",
    success: "Owners and next steps are clear and accepted by the team.",
    guardrail: "Agent does not send recap without meeting owner approval.",
  },
  {
    track: "Education",
    title: "Source-grounded study coach",
    chat: "Quiz a learner on assigned reading and explain misconceptions.",
    skill: "Study coach skill using only approved sources, quizzes, flashcards, and reflection prompts.",
    agent: "Generate a weekly practice pack from approved readings.",
    inputs: "Instructor-approved readings, public sources, learner goals.",
    success: "Learner improves recall and can cite the source of answers.",
    guardrail: "Agent does not do graded work for the learner.",
  },
  {
    track: "Accessibility",
    title: "Document accessibility checker",
    chat: "Review one document for readability and accessibility issues.",
    skill: "Accessibility review skill with plain-language, headings, alt text, and screen-reader checklist.",
    agent: "When a draft is added, create an accessibility review report.",
    inputs: "Public or internal draft documents, accessibility checklist.",
    success: "Document becomes easier to read and navigate.",
    guardrail: "Human reviewer resolves recommendations.",
  },
  {
    track: "Marketing",
    title: "Community story repurposer",
    chat: "Turn one approved story into a post, newsletter item, and event blurb.",
    skill: "Repurposing skill with voice rules, consent check, and channel formats.",
    agent: "Draft channel-specific versions from approved stories and route for review.",
    inputs: "Approved stories, style guide, consent notes.",
    success: "Outputs are specific, respectful, and ready for editing.",
    guardrail: "No story published without consent and human approval.",
  },
  {
    track: "Food pantry",
    title: "Volunteer shift handoff helper",
    chat: "Summarize shift notes into handoff items.",
    skill: "Shift handoff skill with inventory flags, unresolved needs, and safety notes.",
    agent: "Create a handoff draft when shift notes are submitted.",
    inputs: "Redacted shift notes, inventory categories, escalation rules.",
    success: "Next shift starts with fewer missed details.",
    guardrail: "No beneficiary personal details in the tool.",
  },
  {
    track: "Career services",
    title: "Mock interview coach",
    chat: "Role-play interview questions for one target role.",
    skill: "Interview practice skill with rubric, feedback, and stronger answer examples.",
    agent: "Generate a weekly practice plan from target roles and prior feedback.",
    inputs: "Target job posts, learner-approved background, rubric.",
    success: "Learner answers become more specific, truthful, and role-aligned.",
    guardrail: "No fabricated experience or credentials.",
  },
  {
    track: "Finance admin",
    title: "Invoice exception sorter",
    chat: "Classify sample invoice issues and draft clarification questions.",
    skill: "Invoice exception skill with categories, missing info checklist, and escalation rules.",
    agent: "Sort approved invoice samples into review queues and draft questions.",
    inputs: "Synthetic invoices, redacted examples, policy checklist.",
    success: "Exceptions are easier to route and resolve.",
    guardrail: "No payment, vendor, or financial decision is automated.",
  },
  {
    track: "Human resources",
    title: "Policy Q&A assistant",
    chat: "Answer an employee policy question using only source policy docs.",
    skill: "Policy Q&A skill with citations, uncertainty language, and HR escalation.",
    agent: "Draft answers to approved policy questions and flag ambiguous cases.",
    inputs: "Public or internal policy docs approved for use.",
    success: "Answer is source-linked and routes sensitive cases to HR.",
    guardrail: "No employment, legal, or benefits decision.",
  },
  {
    track: "Climate/community",
    title: "Local resilience resource map",
    chat: "Summarize local resilience resources for one neighborhood need.",
    skill: "Resource mapping skill with audience, location, source, and access notes.",
    agent: "Check approved public resource pages monthly and flag stale entries.",
    inputs: "Public resource directories, city pages, community partner lists.",
    success: "Resource map is current, accessible, and locally useful.",
    guardrail: "No emergency response instructions beyond official sources.",
  },
  {
    track: "Sales/customer success",
    title: "Account prep brief",
    chat: "Summarize public account context and draft discovery questions.",
    skill: "Account prep skill with public sources, open questions, and risk notes.",
    agent: "Prepare a draft account brief when a meeting is added to the tracker.",
    inputs: "Public company pages, approved CRM notes, meeting goal.",
    success: "Brief saves prep time and improves question quality.",
    guardrail: "No confidential claims or outreach without approval.",
  },
  {
    track: "Research",
    title: "Source comparison memo",
    chat: "Compare three sources and identify agreement, disagreement, and uncertainty.",
    skill: "Source comparison skill with citation table and confidence labels.",
    agent: "Build a draft literature/source memo from an approved source pack.",
    inputs: "Public articles, PDFs, reports, source notes.",
    success: "Memo is traceable, balanced, and useful for a decision.",
    guardrail: "No unsupported synthesis presented as fact.",
  },
  {
    track: "Events",
    title: "Event operations co-pilot",
    chat: "Turn event goals into a run of show and task list.",
    skill: "Event ops skill with timeline, owner matrix, risk list, and attendee comms.",
    agent: "Generate weekly event status drafts from the task tracker.",
    inputs: "Event brief, vendor list, task tracker, venue constraints.",
    success: "Team sees blockers earlier and misses fewer handoffs.",
    guardrail: "No vendor commitments or public comms without approval.",
  },
  {
    track: "Procurement",
    title: "Vendor comparison helper",
    chat: "Compare public vendor information against a needs checklist.",
    skill: "Vendor comparison skill with criteria, evidence links, and unanswered questions.",
    agent: "Draft comparison tables from approved vendor source packs.",
    inputs: "Public vendor pages, RFP criteria, user needs.",
    success: "Decision-makers see options, caveats, and missing info.",
    guardrail: "No procurement recommendation without human review.",
  },
  {
    track: "Museum/culture",
    title: "Exhibit accessibility companion",
    chat: "Draft plain-language and multilingual exhibit labels from approved curator notes.",
    skill: "Exhibit companion skill with accessibility, tone, and source review.",
    agent: "Generate draft companion text for new approved exhibit notes.",
    inputs: "Curator-approved notes, public exhibit text, accessibility guide.",
    success: "Visitors get clearer, more inclusive explanations.",
    guardrail: "Curatorial and translation review before release.",
  },
  {
    track: "Legal aid adjacent",
    title: "Intake prep organizer",
    chat: "Turn a public intake checklist into a preparation guide.",
    skill: "Intake prep skill that organizes documents, questions, and next steps.",
    agent: "Create a prep checklist from a selected service type and public guidance.",
    inputs: "Public legal aid pages, service categories, document lists.",
    success: "Client arrives more prepared for a human appointment.",
    guardrail: "No legal advice, eligibility decision, or case strategy.",
  },
  {
    track: "Internal training",
    title: "SOP learning coach",
    chat: "Explain one standard operating procedure and quiz for understanding.",
    skill: "SOP coach skill with examples, checks, and common mistakes.",
    agent: "Create practice packs when an approved SOP is updated.",
    inputs: "Approved SOPs, job aids, trainer notes.",
    success: "New team members understand the process and risks faster.",
    guardrail: "Supervisor confirms competency before independent work.",
  },
  {
    track: "Public media",
    title: "Archive discovery helper",
    chat: "Summarize public archive items and suggest themes for a story package.",
    skill: "Archive discovery skill with metadata extraction, theme clustering, and source notes.",
    agent: "Queue related archive items from public metadata for editorial review.",
    inputs: "Public archive metadata, transcripts, editorial brief.",
    success: "Producer finds relevant material faster with source traceability.",
    guardrail: "No editorial claims without human verification.",
  },
];

const esc = (s) =>
  String(s).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

function brandMark() {
  return `<span class="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 64 64" role="img">
              <g transform="translate(32 32)">
                <ellipse cx="0" cy="-12" rx="9" ry="14" fill="#dfca8c" stroke="#000" stroke-width="1"></ellipse>
                <ellipse cx="12" cy="0" rx="14" ry="9" fill="#b990f0" stroke="#000" stroke-width="1"></ellipse>
                <ellipse cx="0" cy="12" rx="9" ry="14" fill="#a8dbc9" stroke="#000" stroke-width="1"></ellipse>
                <ellipse cx="-12" cy="0" rx="14" ry="9" fill="#e8defa" stroke="#000" stroke-width="1"></ellipse>
                <circle r="5" fill="#f7f3ee" stroke="#000" stroke-width="1"></circle>
                <circle r="1.6" fill="#000"></circle>
              </g>
            </svg>
          </span>`;
}

function siteHeader({ level = "root", current = "" } = {}) {
  const paths = {
    root: {
      home: "index.html",
      start: "index.html#start",
      program: "index.html#curriculum",
      kit: "launch-kit/index.html",
      evidence: "research.html",
    },
    kit: {
      home: "../index.html",
      start: "../index.html#start",
      program: "../index.html#curriculum",
      kit: "index.html",
      evidence: "../research.html",
    },
    doc: {
      home: "../../index.html",
      start: "../../index.html#start",
      program: "../../index.html#curriculum",
      kit: "../index.html",
      evidence: "../../research.html",
    },
  }[level];
  const currentAttr = (key) => (current === key ? ' aria-current="page"' : "");
  return `<header class="site-header">
      <div class="nav-shell">
        <a class="brand" href="${paths.home}" aria-label="The AI Kit home">
          ${brandMark()}
          <span class="brand-name"><b>The AI</b> <em>Kit</em></span>
        </a>
        <nav class="nav-links" aria-label="Primary navigation">
          <a class="nav-action" href="${paths.start}">Start</a>
          <a href="${paths.program}"${currentAttr("program")}>Program</a>
          <a href="${paths.kit}"${currentAttr("kit")}>Kit</a>
          <a href="${paths.evidence}"${currentAttr("evidence")}>Evidence</a>
        </nav>
      </div>
    </header>`;
}

function htmlPage({ title, eyebrow, intro, body, extraHead = "", current = "kit" }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${esc(title)} | The AI Kit</title>
    <link rel="stylesheet" href="../kit.css?v=polish-17">
    ${extraHead}
  </head>
  <body>
    ${siteHeader({ level: "doc", current })}
    <main class="doc">
      <section class="doc-hero">
        <p class="eyebrow">${esc(eyebrow)}</p>
        <h1>${esc(title)}</h1>
        <p>${esc(intro)}</p>
      </section>
      ${body}
    </main>
  </body>
</html>`;
}

function card(title, body) {
  return `<article class="card"><h3>${title}</h3>${body}</article>`;
}

function list(items) {
  return `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

function table(headers, rows) {
  return `<div class="table-wrap"><table><thead><tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows
    .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`)
    .join("")}</tbody></table></div>`;
}

const kitCss = `:root {
  --ink:#000;
  --paper:#f7f3ee;
  --white:#fff;
  --off:#1f1d23;
  --muted:#5f5a64;
  --wash:#e8defa;
  --cream:#f0ead7;
  --coral:#d88fb7;
  --gold:#dfca8c;
  --mint:#a8dbc9;
  --violet:#b990f0;
  --soft-panel:linear-gradient(145deg, #efe6ff 0%, #f8f4ed 52%, #f1e8d2 100%);
  --lilac-glass:linear-gradient(145deg, rgba(236,214,255,.94), rgba(255,255,255,.82) 46%, rgba(242,234,212,.94));
  --serif: Georgia, Cambria, "Times New Roman", Times, serif;
  --mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  --sans: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
* { box-sizing: border-box; }
body { margin: 0; background: radial-gradient(circle at 10% 0%, rgba(234,214,255,.5), transparent 34rem), radial-gradient(circle at 90% 2%, rgba(240,234,215,.7), transparent 30rem), var(--paper); color: var(--ink); font-family: var(--mono); line-height: 1.45; letter-spacing: -0.02em; }
a { color: inherit; text-underline-offset: 3px; }
.site-header { position: sticky; top: 0; z-index: 50; background: rgba(247,243,238,.92); border-bottom: 1px solid rgba(0,0,0,.08); backdrop-filter: blur(10px); }
.nav-shell { display: flex; justify-content: space-between; gap: 24px; align-items: center; max-width: 1432px; margin: 0 auto; padding: 16px 40px; flex-wrap: wrap; }
.brand { display: flex; align-items: center; gap: 12px; color: var(--ink); text-decoration: none; font-family: var(--mono); font-size: 16px; }
.brand-mark { width: 34px; height: 34px; display: inline-block; flex-shrink: 0; }
.brand-mark svg { width: 100%; height: 100%; display: block; }
.brand-name b { font-weight: 400; }
.brand-name em { font-family: var(--serif); font-style: normal; font-size: 17px; }
.brand-name { white-space: nowrap; }
.nav-links { display: flex; align-items: center; justify-content: flex-end; gap: 4px; flex-wrap: wrap; }
.nav-links a { position: relative; color: var(--off); text-decoration: none; padding: 8px 12px; font-size: 15px; border-radius: 100px; }
.nav-links a:not([aria-current]):not(.nav-action)::after { content: ""; position: absolute; left: 12px; right: 12px; bottom: 4px; height: 1px; background: var(--ink); transform: scaleX(0); transform-origin: left; transition: transform .2s ease; }
.nav-links a:not([aria-current]):not(.nav-action):hover::after { transform: scaleX(1); }
.nav-links a[aria-current="page"] { background: rgba(234,214,255,.72); border: 1px solid rgba(0,0,0,.16); padding: 9px 16px; }
.nav-links a.nav-action { background: var(--off); color: var(--paper); border: 1px solid var(--off); padding: 10px 18px; margin-left: 0; }
.doc { max-width: 1120px; margin: 0 auto; padding: 56px 32px 96px; }
.doc-hero { margin-bottom: 48px; max-width: 880px; }
.eyebrow, .kicker { text-transform: uppercase; letter-spacing: .06em; font-size: 12px; color: var(--muted); margin: 0 0 18px; }
h1, h2, h3, h4 { font-family: var(--serif); font-weight: 400; line-height: 1.12; letter-spacing: -0.03em; margin: 0; }
h1 { font-size: clamp(42px, 7vw, 80px); }
h2 { font-size: clamp(30px, 4vw, 44px); margin: 56px 0 18px; }
h3 { font-size: 25px; margin-bottom: 12px; }
h4 { font-size: 20px; margin: 20px 0 8px; }
p { color: var(--muted); margin: 0 0 14px; }
.doc-hero p { font-family: var(--sans); font-size: 20px; line-height: 1.55; }
.grid { display: grid; gap: 16px; }
.two { grid-template-columns: repeat(2, minmax(0,1fr)); }
.three { grid-template-columns: repeat(3, minmax(0,1fr)); }
.four { grid-template-columns: repeat(4, minmax(0,1fr)); }
.five { grid-template-columns: repeat(5, minmax(0,1fr)); }
.card { background: var(--soft-panel); border: 1px solid rgba(0,0,0,.12); border-radius: 28px; padding: 28px; }
.wash { background: var(--wash); }
.ink { background: var(--ink); color: var(--paper); }
.ink p, .ink li { color: rgba(247,243,238,.74); }
.pill { display: inline-flex; border: 1px solid var(--off); border-radius: 100px; padding: 6px 12px; font-size: 12px; text-transform: uppercase; letter-spacing: .05em; }
ul, ol { margin: 12px 0 0; padding-left: 22px; color: var(--muted); }
li { margin: 7px 0; }
.week { page-break-inside: avoid; border-top: 1px solid rgba(0,0,0,.16); padding-top: 28px; margin-top: 28px; }
.session { background: var(--white); border: 1px solid rgba(0,0,0,.12); border-radius: 22px; padding: 22px; margin: 14px 0; page-break-inside: avoid; }
.agenda { display: grid; grid-template-columns: 100px 1fr; gap: 10px; margin: 12px 0; }
.agenda span:first-child { color: var(--muted); font-size: 13px; }
.table-wrap { overflow-x: auto; border: 1px solid rgba(0,0,0,.12); border-radius: 24px; background: var(--white); margin: 18px 0 32px; }
table { width: 100%; border-collapse: collapse; min-width: 780px; font-size: 14px; }
th, td { text-align: left; vertical-align: top; padding: 16px 18px; border-bottom: 1px solid rgba(0,0,0,.1); }
th { color: var(--muted); text-transform: uppercase; letter-spacing: .06em; font-size: 12px; background: var(--paper); }
tr:last-child td { border-bottom: none; }
.callout { background: var(--lilac-glass); border: 1px solid rgba(0,0,0,.12); border-radius: 28px; padding: 28px; margin: 28px 0; }
.artifact-list a { display: flex; justify-content: space-between; gap: 16px; padding: 18px 0; border-bottom: 1px solid rgba(0,0,0,.14); text-decoration: none; }
.artifact-list strong { font-family: var(--serif); font-size: 22px; font-weight: 400; }
.button { display:inline-flex; text-decoration:none; align-items:center; border:1px solid var(--off); background:var(--off); color:var(--paper); border-radius:100px; padding:14px 20px; margin:8px 8px 8px 0; transition: background .2s ease, color .2s ease, transform .2s ease; }
.button:hover { transform: translateY(-1px); }
.button.secondary { background: transparent; color: var(--off); }
.button.secondary:hover { background: var(--off); color: var(--paper); }
.button:focus-visible, .nav-links a:focus-visible, .artifact-list a:focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; }
@media (max-width: 1100px) { .five { grid-template-columns: repeat(2, minmax(0,1fr)); } }
@media (max-width: 820px) { .two,.three,.four,.five { grid-template-columns: 1fr; } .nav-shell { padding: 16px 24px; gap: 10px; align-items: flex-start; } .nav-links { width: 100%; justify-content: flex-start; gap: 6px; } .nav-links a { font-size: 12px; padding: 7px 10px; border: 1px solid rgba(0,0,0,.12); } .nav-links a[aria-current="page"] { padding: 7px 10px; } .nav-links a.nav-action { padding: 7px 12px; margin-left: 0; } .doc { padding: 40px 24px 72px; } }
@media (max-width: 430px) { .brand-mark { width: 30px; height: 30px; } .brand-name { font-size: 14px; } }
@media print { .site-header { position: static; } body { background: white; } .card,.session,.callout,.table-wrap { box-shadow: none; } a { text-decoration: none; } }
`;

fs.writeFileSync(path.join(kitRoot, "kit.css"), kitCss);

const artifactLinks = [
  ["00-start-here-program-guide.html", "Start Here: Run This Program", "Host checklist, operating model, launch sequence, roles, and what success looks like."],
  ["12-one-day-build-sprint-runbook.html", "1-Day Build Sprint Runbook", "Optional on-ramp agenda, tool setup, project prompts, demo format, and follow-up into the cohort."],
  ["01-facilitator-handbook.html", "Facilitator Handbook", "Teaching stance, room norms, support moves, scripts, and every-session rituals."],
  ["02-learner-workbook.html", "Learner Workbook", "Week-by-week workspace, reflections, project pages, and share prompts."],
  ["03-session-plans.html", "36 Live Session Plans", "Three live sessions per week across 12 weeks with minute-by-minute flow."],
  ["04-daily-prompts-and-challenges.html", "Daily Prompts and Challenges", "Five prompts per week, weekly challenges, and self-directed practice rhythm."],
  ["05-homework-and-project-briefs.html", "Homework and Project Briefs", "Every assignment, project template, sample briefs, and portfolio requirements."],
  ["06-employer-workflow-donation-kit.html", "Employer Workflow Donation Kit", "Partner ask, scoping guide, privacy rules, manager check-ins, and review forms."],
  ["07-measurement-and-rubrics.html", "Measurement and Rubrics", "Baseline, midpoint, final measures, portfolio rubric, and outcome reporting."],
  ["08-community-comms-pack.html", "Community Comms Pack", "Recruitment copy, cohort launch posts, weekly share prompts, and graduation copy."],
  ["09-shareout-and-graduation-kit.html", "Shareout and Graduation Kit", "Demo day agenda, panel guide, certificate language, and next-step scripts."],
  ["10-ai-tool-setup-and-safety.html", "AI Tool Setup and Safety", "Tool-agnostic setup, Ask-Guide-Make-Check-Show pedagogy, privacy, and disclosure rules."],
  ["11-project-bank-chat-skills-agents.html", "Project Bank: Chat to Skills to Agents", "Real buildable projects that move learners from chat practice to reusable skills to bounded agents."],
];

const docsIndex = `<div class="artifact-list">${artifactLinks
  .map(([href, title, desc]) => `<a href="v1/${href}"><strong>${title}</strong><span>${desc}</span></a>`)
  .join("")}</div>`;

fs.writeFileSync(
  path.join(kitRoot, "index.html"),
  `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Launch Kit | The AI Kit</title>
    <link rel="stylesheet" href="kit.css?v=polish-17">
  </head>
  <body>
    ${siteHeader({ level: "kit", current: "kit" })}
    <main class="doc">
      <section class="doc-hero">
        <p class="eyebrow">Start here</p>
        <h1>Start here. Run the 12-week cohort.</h1>
        <p>The public operating kit for The AI Kit. Confirm the host checklist, use the 1-day build sprint as an optional on-ramp, then run the cohort with clear sessions, projects, tools, and measurement.</p>
        <a class="button" href="v1/00-start-here-program-guide.html">Start here: run this program</a>
        <a class="button secondary" href="downloads/the-ai-kit-launch-kit-v1.zip">Download full kit (.zip)</a>
      </section>
      <section id="start-here">
        <h2>The simple path</h2>
        <div class="grid five">
          ${card("1. Start here", "<p>Confirm host, 20 to 30 learners, facilitator pair, AI access, shared workspace, workflows, and demo day date.</p><p><a href=\"v1/00-start-here-program-guide.html\">Open guide →</a></p>")}
          ${card("2. Run a 1-day build sprint", "<p>Optional on-ramp: set up tools, teach the method, build one small project, and recruit into the full cohort.</p><p><a href=\"v1/12-one-day-build-sprint-runbook.html\">Open sprint runbook →</a></p>")}
          ${card("3. Run the 12-week cohort", "<p>Readiness, practice, and portfolio sessions with exercises, homework, and weekly artifacts.</p><p><a href=\"v1/03-session-plans.html\">Open session plans →</a></p>")}
          ${card("4. Measure outcomes", "<p>Track capability gain, learning quality, work usefulness, and pathway conversion from day one.</p><p><a href=\"v1/07-measurement-and-rubrics.html\">Open measurement →</a></p>")}
          ${card("5. Use the full library", "<p>Facilitator handbook, learner workbook, project bank, workflow donation, comms, demo day, safety, and templates.</p><p><a href=\"#full-library\">Browse library →</a></p>")}
        </div>
      </section>
      <section>
        <h2>What a host needs</h2>
        ${table(["Need", "Minimum"], [
          ["Learners", "20 to 30 adults, students, frontline workers, job seekers, or staff."],
          ["Facilitation", "One facilitator pair and one program lead."],
          ["Tools", "One AI assistant, shared workspace, spreadsheet tracker, and meeting room or video link."],
          ["Projects", "Three to six real workflows from employers or community organizations."],
          ["Proof", "A baseline survey, portfolio rubric, project tracker, and demo day date."],
        ])}
      </section>
      <section id="full-library">
        <h2>Full library</h2>
        <p>Use these when you are ready for depth. The first five steps above are the operating path; this library is the shelf behind it.</p>
        ${docsIndex}
      </section>
    </main>
  </body>
</html>`
);

fs.writeFileSync(
  path.join(v1, "00-start-here-program-guide.html"),
  htmlPage({
    title: "Start Here: Run This Program",
    eyebrow: "V1 operating model",
    intro: "Use this first. It gives a host the minimum decisions, tools, roles, launch sequence, and success measures needed to start the 12-week cohort.",
    body: `
      <section class="callout"><h3>The first decision</h3><p>Run a 1-day build sprint if people need to see and feel the method first. If the host, learners, workflows, and facilitator pair are already clear, go straight into the 12-week cohort.</p></section>
      <h2>Host checklist</h2>
      ${table(["Need", "Minimum"], [
        ["Learners", "20 to 30 people who can attend consistently and bring real work, school, job-search, or community tasks."],
        ["Facilitation", "One facilitator pair plus one local program lead who can remove access and attendance barriers."],
        ["Tools", "One hosted AI assistant, shared drive or LMS folder, spreadsheet tracker, and classroom or video meeting space."],
        ["Workflows", "Three to six safe, recurring workflows from employers or community organizations."],
        ["Evidence", "Baseline survey, portfolio rubric, project tracker, and a demo day date before the cohort starts."],
      ])}
      <section class="grid two">
        ${card("Program promise", `<p>The AI Kit turns AI access into practical workplace capability through trusted local institutions, real workflows, portfolio proof, and apprenticeship handoff.</p>`)}
        ${card("Default cohort", list(["24 to 30 learners", "12 weeks", "Three 60-minute live sessions per week", "Three hours of self-directed practice per week", "Three to six workflow partners", "One demo day and public cohort report"]))}
      </section>
      <h2>The learning arc: chat to skills to agents</h2>
      <p>Learners do not start by building agents. They earn their way there. First they learn to think with chat, then package useful patterns as reusable skills, then turn stable low-risk skills into bounded agents with tests and human approval.</p>
      ${table(["Level", "What learners build", "Move on when"], progression)}
      <h2>How people should show up</h2>
      <div class="grid three">
        ${card("Learners", "<p>Curious, honest about confidence, ready to practice in public, and willing to show work before it is polished.</p>")}
        ${card("Facilitators", "<p>Calm, specific, non-hype, respectful of adult lives, and relentless about verification and human judgment.</p>")}
        ${card("Partners", "<p>Generous with safe workflows, clear about constraints, and ready to give useful feedback instead of vague encouragement.</p>")}
      </div>
      <h2>How people should feel</h2>
      ${table(["Moment", "Learner feeling", "Facilitator job"], [
        ["Week 0", "Expected, welcomed, unblocked", "Remove access friction and make the path legible."],
        ["Weeks 1-3", "Respected and oriented", "Normalize uncertainty and teach safety through practice."],
        ["Weeks 4-8", "Useful and challenged", "Keep work real, small, testable, and human-reviewed."],
        ["Weeks 9-12", "Proud and employable", "Help learners tell a clear story with evidence and next steps."],
      ])}
      <h2>Roles</h2>
      ${table(["Role", "Owns", "Cadence"], [
        ["Program lead", "Timeline, partners, reporting, accessibility, final decisions.", "3-5 hours/week."],
        ["Lead facilitator", "Session delivery, learner support, portfolio quality.", "4-6 hours/week."],
        ["Local trust lead", "Recruitment, attendance support, community context.", "2-4 hours/week."],
        ["Employer or community partner", "Workflow brief, midpoint review, demo feedback.", "4-6 total hours."],
        ["Mentor", "Two learner check-ins and demo day feedback.", "2-3 total hours."],
      ])}
      <h2>10-day launch sequence</h2>
      ${table(["Day", "Decision", "Output"], [
        ["1", "Choose host, learner group, and program lead.", "One-page cohort charter."],
        ["2", "Pick schedule and room/virtual setup.", "Published cohort calendar."],
        ["3", "Recruit workflow partners.", "Three partner scoping calls booked."],
        ["4", "Select facilitator pair.", "Facilitator prep block scheduled."],
        ["5", "Publish learner invitation.", "Application form live."],
        ["6", "Build support system.", "Office hours, contact path, access-needs process."],
        ["7", "Prepare tool setup.", "Account instructions and privacy defaults."],
        ["8", "Prepare baseline measures.", "Survey, rubric, tracker."],
        ["9", "Confirm first workflows.", "Workflow bank v0."],
        ["10", "Send welcome note.", "Week 0 checklist and calendar invites."],
      ])}
      <h2>Success looks like</h2>
      <div class="grid four">
        ${card("Access", "<p>People who normally feel outside AI conversations show up and stay.</p>")}
        ${card("Capability", "<p>Learners can define, guide, check, and explain AI-assisted work.</p>")}
        ${card("Work impact", "<p>Projects improve a real workflow with evidence, not vibes.</p>")}
        ${card("Pathway", "<p>Graduates leave with a portfolio, mentor, and next-step role path.</p>")}
      </div>
    `,
  })
);

fs.writeFileSync(
  path.join(v1, "01-facilitator-handbook.html"),
  htmlPage({
    title: "Facilitator Handbook",
    eyebrow: "Teaching stance",
    intro: "This is the room guide. It tells facilitators how to hold the cohort, what to say, how to respond, and how to keep the program humane.",
    body: `
      <section class="callout"><h3>Default stance</h3><p>Adults do not need a hype lecture. They need respect, useful practice, room for doubt, and enough structure to leave with evidence of capability.</p></section>
      <h2>Room norms</h2>
      <div class="grid two">
        ${card("Say these on day one", list(["We learn in public, but we do not expose private data.", "We can be excited and skeptical at the same time.", "We do not shame people for not knowing tools.", "We verify before sharing.", "We keep humans responsible for decisions that affect people.", "We document useful failures."]))}
        ${card("Repeat these all cohort", list(["Small useful work beats impressive demos.", "The model is not the boss.", "Source checks are part of the work.", "Disclosure is professional, not embarrassing.", "If a task affects people, a human owns the decision."]))}
      </div>
      <h2>Default 60-minute live session</h2>
      ${table(["Minute", "Move", "Facilitator notes"], [
        ["0-5", "Arrival prompt", "Question on screen. Learners answer in chat, notes, or pair."],
        ["5-12", "Concept", "One idea, one example, one caution."],
        ["12-22", "Demo", "Show the tool, narrate judgment, include a mistake."],
        ["22-40", "Guided practice", "Learners work with a prompt, source, or workflow."],
        ["40-50", "Pair feedback", "Use Keep, Check, Change."],
        ["50-57", "Artifact commit", "Each learner updates portfolio or workbook."],
        ["57-60", "Exit ticket", "Confidence, blocker, next action."],
      ])}
      <h2>Facilitation moves</h2>
      <div class="grid two">
        ${card("When a learner is anxious", list(["Ask what part feels risky.", "Separate job fear from tool confusion.", "Give a small task with a quick win.", "Pair them with someone patient."]))}
        ${card("When a learner over-trusts AI", list(["Ask what happens if the answer is wrong.", "Require a source check.", "Ask for known, unknown, needs-human-review.", "Have them test one edge case."]))}
        ${card("When output feels good enough", list(["Ask who will use it.", "Ask what the user needs to trust it.", "Ask what would make it more accessible.", "Require a before/after note."]))}
        ${card("When someone wants to automate too much", list(["Name the approval point.", "Name the reversal point.", "Name who is harmed if it fails.", "Write a do-not-automate rule."]))}
      </div>
      <h2>Feedback pattern: Keep, Check, Change</h2>
      ${table(["Move", "Question", "Example"], [
        ["Keep", "What is working and should remain?", "The output is clear and preserves the learner's voice."],
        ["Check", "What needs verification, context, or human review?", "The cost estimate needs a source and date."],
        ["Change", "What should be revised before use?", "Remove private details and add an escalation note."],
      ])}
      <h2>Weekly facilitator ritual</h2>
      ${list(["Before session A: review exit tickets and pick one demo.", "After session A: identify learners needing access or confidence support.", "Before session B: prepare one low-risk practice dataset or scenario.", "After session C: capture one example, one failure, and one local playbook update.", "Every Friday: send a short recap with the next week's artifact."])}
    `,
  })
);

const workbookRows = weeks
  .filter((w) => w.n > 0)
  .map((w) => [
    `Week ${w.n}`,
    `<strong>${w.title}</strong><br>${w.promise}`,
    w.artifact,
    w.challenge,
  ]);

fs.writeFileSync(
  path.join(v1, "02-learner-workbook.html"),
  htmlPage({
    title: "Learner Workbook",
    eyebrow: "Portfolio workspace",
    intro: "Learners can use this as a printed workbook, copied Google Doc, or LMS module. Each week creates one piece of portfolio evidence.",
    body: `
      <section class="callout"><h3>Your promise to yourself</h3><p>By the end of this cohort, you will be able to show a real workflow you improved, explain how you used AI, prove how you checked the work, and name what should stay human.</p></section>
      <h2>Weekly workbook</h2>
      ${table(["Week", "Learning goal", "Artifact", "Challenge"], workbookRows)}
      <h2>Reflection pages</h2>
      <div class="grid two">
        ${card("Before each session", list(["What did I try since last time?", "Where did I get stuck?", "What do I need from the room today?"]))}
        ${card("After each session", list(["What changed in my understanding?", "What did I verify?", "What will I add to my portfolio folder?"]))}
        ${card("For every AI output", list(["What prompt did I use?", "What source or context did I provide?", "What did I check?", "What did I change before using it?"]))}
        ${card("Before demo day", list(["What was the old workflow?", "Where did AI help?", "What evidence changed?", "What would I never automate?", "What next role or opportunity does this support?"]))}
      </div>
      <h2>Portfolio checklist</h2>
      ${list(["Personal AI use statement", "Prompt pattern library", "Verification checklist", "Workflow map", "Evidence memo", "Inclusive use review", "Guardrail plan", "Project brief", "Prototype or process artifact", "Test notes", "Implementation guide", "Demo script", "Role brief", "Public or private share post"])}
    `,
  })
);

const sessionTypes = [
  ["A", "Learn", "Introduce the concept and model one worked example."],
  ["B", "Lab", "Practice with a scenario, source pack, or learner workflow."],
  ["C", "Studio", "Apply to portfolio work, share, and get feedback."],
];

const sessionBody = weeks
  .filter((w) => w.n > 0)
  .map(
    (w) => `<section class="week">
      <p class="kicker">Week ${w.n} - ${w.phase}</p>
      <h2>${w.title}</h2>
      <p><strong>Promise:</strong> ${w.promise}</p>
      <p><strong>Target feeling:</strong> ${w.feel}</p>
      ${sessionTypes
        .map(
          ([code, label, purpose], idx) => `<article class="session">
            <span class="pill">Session ${w.n}${code} - ${label}</span>
            <h3>${idx === 0 ? w.title : idx === 1 ? "Guided practice lab" : "Portfolio studio"}</h3>
            <p>${purpose}</p>
            <div class="agenda"><span>0-5</span><div>Arrival prompt: ${w.prompts[idx]}</div></div>
            <div class="agenda"><span>5-12</span><div>Teach one idea: ${idx === 0 ? w.promise : idx === 1 ? "use the idea on a safe practice task" : "apply the idea to each learner's portfolio project"}.</div></div>
            <div class="agenda"><span>12-22</span><div>Live demo with visible mistakes, source checks, and human judgment.</div></div>
            <div class="agenda"><span>22-40</span><div>${idx === 0 ? "Guided pair practice using the week's shared example." : idx === 1 ? "Individual or pair practice on role-specific tasks." : "Portfolio build time with facilitator rounds."}</div></div>
            <div class="agenda"><span>40-50</span><div>Peer feedback using Keep, Check, Change.</div></div>
            <div class="agenda"><span>50-57</span><div>Artifact commit: ${w.artifact}</div></div>
            <div class="agenda"><span>57-60</span><div>Exit ticket: confidence score, blocker, and next action.</div></div>
            <h4>Facilitator prep</h4>
            ${list(["One practical demo", "One low-risk scenario or source pack", "One extension task for advanced learners", "One accessibility adaptation"])}
          </article>`
        )
        .join("")}
    </section>`
  )
  .join("");

fs.writeFileSync(
  path.join(v1, "03-session-plans.html"),
  htmlPage({
    title: "36 Live Session Plans",
    eyebrow: "12 weeks x 3 sessions",
    intro: "Each week has one Learn session, one Lab session, and one Studio session. The cadence keeps teaching practical, social, and portfolio-driven.",
    body: sessionBody,
  })
);

const promptRows = weeks
  .filter((w) => w.n > 0)
  .flatMap((w) => w.prompts.map((p, i) => [`Week ${w.n}`, ["Mon", "Tue", "Wed", "Thu", "Fri"][i], p, i < 2 ? "Ask" : i === 2 ? "Guide" : i === 3 ? "Check" : "Show"]));

fs.writeFileSync(
  path.join(v1, "04-daily-prompts-and-challenges.html"),
  htmlPage({
    title: "Daily Prompts and Challenges",
    eyebrow: "Self-directed practice",
    intro: "Use these prompts between live sessions. They create a steady rhythm of reflection, practice, verification, and public proof.",
    body: `
      <h2>Weekly challenges</h2>
      ${table(["Week", "Challenge", "Homework"], weeks.filter((w) => w.n > 0).map((w) => [`Week ${w.n}: ${w.title}`, w.challenge, w.homework]))}
      <h2>Daily prompts</h2>
      ${table(["Week", "Day", "Prompt", "Pedagogy"], promptRows)}
      <h2>Sharing rhythm</h2>
      <div class="grid three">
        ${card("Monday", "<p>Share one question you are learning to ask better.</p>")}
        ${card("Wednesday", "<p>Share one useful failure or source check.</p>")}
        ${card("Friday", "<p>Share one artifact update, with private data removed.</p>")}
      </div>
    `,
  })
);

fs.writeFileSync(
  path.join(v1, "05-homework-and-project-briefs.html"),
  htmlPage({
    title: "Homework and Project Briefs",
    eyebrow: "Assignments",
    intro: "This is the assignment spine. Every homework item creates evidence for the final portfolio and demo.",
    body: `
      <h2>Homework by week</h2>
      ${table(["Week", "Homework", "Done when"], weeks.filter((w) => w.n > 0).map((w) => [`Week ${w.n}: ${w.title}`, w.homework, `The learner has added ${w.artifact.toLowerCase()} to the portfolio folder.`]))}
      <h2>Portfolio project brief template</h2>
      ${table(["Field", "Prompt"], [
        ["User", "Who uses or benefits from this workflow?"],
        ["Current state", "What happens now? Include time, pain, handoffs, and quality issues."],
        ["Desired state", "What should be easier, clearer, faster, more accessible, or safer?"],
        ["AI assist", "Where will AI help? Drafting, summarizing, checking, structuring, translating, planning, or prototyping?"],
        ["Human responsibility", "Who approves, edits, decides, escalates, or says no?"],
        ["Data boundaries", "What data is safe, redacted, synthetic, public, or off limits?"],
        ["Evidence", "What before/after measure will prove usefulness?"],
        ["Share plan", "What can be shared publicly, privately, or only with the partner?"],
      ])}
      <h2>Sample project briefs</h2>
      <p>Every project can be taught in three passes: chat first, then reusable skill, then bounded agent if the task is safe and repeatable. The full project bank is in <a href="11-project-bank-chat-skills-agents.html">Project Bank: Chat to Skills to Agents</a>.</p>
      <div class="grid two">
        ${card("Student services", "<p>Turn scattered advising notes into a plain-language next-step plan, with source links to official policies and a human advisor review point.</p>")}
        ${card("Nonprofit operations", "<p>Convert intake call notes into a service referral checklist, redacting personal details and adding escalation rules.</p>")}
        ${card("Small business", "<p>Transform customer feedback into a weekly improvement memo with themes, examples, and owner assignments.</p>")}
        ${card("Job seeker", "<p>Build a role-search system that compares postings, maps skill gaps, and produces a weekly application plan.</p>")}
      </div>
      <h2>First 12 real projects to offer</h2>
      ${table(["Track", "Project", "Learner starts with chat", "Graduates toward"], projectBank.slice(0, 12).map((p) => [p.track, p.title, p.chat, p.agent]))}
    `,
  })
);

fs.writeFileSync(
  path.join(v1, "06-employer-workflow-donation-kit.html"),
  htmlPage({
    title: "Employer Workflow Donation Kit",
    eyebrow: "Partner packet",
    intro: "Use this to recruit employers and community organizations to donate safe, recurring workflows for learner projects.",
    body: `
      <section class="callout"><h3>The ask</h3><p>Donate one real, recurring, low-risk workflow. A learner spends 12 weeks mapping it, prototyping an AI-assisted version, testing quality and guardrails, and returning an implementation guide.</p></section>
      <h2>Good workflow donations</h2>
      <div class="grid two">
        ${card("Good fit", list(["Recurring but not mission-critical", "Contains public or redacted data", "Has a clear human reviewer", "Can show before/after usefulness", "Teaches a role skill"]))}
        ${card("Avoid", list(["Sensitive personal data", "Legal, medical, financial, or employment decisions", "High-stakes automation", "Tasks with no reviewer", "Tasks the partner only wants to eliminate"]))}
      </div>
      <h2>Partner scoping call</h2>
      ${table(["Question", "Why it matters"], [
        ["What workflow repeats every week?", "The project needs enough repetition to test improvement."],
        ["Who uses the output?", "The learner needs a real user and review criteria."],
        ["What data is safe to use?", "Privacy boundaries must be explicit before work starts."],
        ["What would make this useful?", "Success must be observable."],
        ["Who can review in weeks 6, 9, and 12?", "Feedback turns practice into apprenticeship."],
      ])}
      <h2>Manager check-ins</h2>
      ${table(["Timing", "Partner action", "Output"], [
        ["Week 4", "Confirm workflow map and risk boundaries.", "Approved project brief."],
        ["Week 6", "Review first draft or evidence memo.", "Feedback notes."],
        ["Week 9", "Review prototype direction.", "Go/no-go and guardrails."],
        ["Week 12", "Attend demo or review recording.", "Usefulness score and next-step recommendation."],
      ])}
      <h2>Partner email</h2>
      <div class="card"><p><strong>Subject:</strong> Donate one workflow to help local learners build practical AI capability</p><p>We are running a 12-week cohort using The AI Kit for adult learners. We are asking selected partners to donate one safe, recurring workflow that a learner can map, improve, test, and return as an implementation guide. This is not free consulting and it is not automation theater. It is a structured learning project with privacy guardrails, human review, and a demo day. Would you be open to a 30-minute scoping call?</p></div>
    `,
  })
);

fs.writeFileSync(
  path.join(v1, "07-measurement-and-rubrics.html"),
  htmlPage({
    title: "Measurement and Rubrics",
    eyebrow: "Evidence program",
    intro: "Measure access, capability, work usefulness, and pathway conversion. Keep it practical enough for local hosts and rigorous enough for serious partners.",
    body: `
      <h2>Core measures</h2>
      ${table(["Category", "Measure", "When"], [
        ["Access", "Applications, attendance, completion, access supports used.", "Weekly"],
        ["Capability", "Pre/post confidence, task fluency, verification behavior, portfolio rubric.", "Weeks 0, 6, 12"],
        ["Work impact", "Hours saved, quality review, cycle time, stakeholder usefulness.", "Weeks 9-12"],
        ["Pathway", "Mentor matches, interviews, apprenticeships, promotions, next courses.", "Week 12 and 90 days"],
      ])}
      <h2>Portfolio rubric</h2>
      ${table(["Dimension", "1 - Emerging", "3 - Capable", "5 - Strong"], [
        ["Problem definition", "Vague task.", "Clear user, workflow, and constraints.", "Specific user need, baseline, and risk context."],
        ["AI use", "Tool use is hidden or generic.", "AI role is named and appropriate.", "AI use is precise, limited, and well documented."],
        ["Verification", "Little evidence of checking.", "Claims and outputs are checked.", "Verification is systematic, sourced, and includes edge cases."],
        ["Human judgment", "No clear responsibility.", "Approval points are named.", "Do-not-automate rules and escalation are clear."],
        ["Impact evidence", "Anecdotal improvement.", "Before/after measure included.", "Useful evidence plus stakeholder review."],
        ["Communication", "Hard to explain.", "Clear demo and portfolio story.", "Honest, concise, credible, and role-relevant."],
      ])}
      <h2>Cohort report outline</h2>
      ${list(["Who participated", "What workflows partners brought", "What learners built", "What improved", "What failed or needs caution", "What learners want next", "What employers or partners want next", "What to change for the next cohort"])}
    `,
  })
);

fs.writeFileSync(
  path.join(v1, "08-community-comms-pack.html"),
  htmlPage({
    title: "Community Comms Pack",
    eyebrow: "Recruit and share",
    intro: "Copy, adapt, and use these messages to recruit learners, partners, mentors, and demo day guests.",
    body: `
      <h2>Learner invite</h2>
      <div class="card"><p><strong>Headline:</strong> Learn real AI through real work.</p><p>The AI Kit is a 12-week community cohort for adults, students, job seekers, nonprofit staff, and frontline teams. You do not need a technical background. You will learn how to use AI responsibly, improve one real workflow, verify your work, and graduate with a portfolio project you can show.</p></div>
      <h2>Launch announcement</h2>
      <div class="card"><p>We are launching a local cohort using The AI Kit: a practical 12-week program where learners build responsible AI capability through real community and employer workflows. The goal is not hype or replacement. The goal is capability, confidence, portfolio proof, and local pathways into better work.</p></div>
      <h2>Weekly share prompts</h2>
      ${table(["Week", "Share prompt"], weeks.filter((w) => w.n > 0).map((w) => [`Week ${w.n}`, `This week I learned ${w.title.toLowerCase()}. The useful thing I can now show is: [artifact]. The thing I am still checking is: [risk or question].`]))}
      <h2>Graduation post</h2>
      <div class="card"><p>I completed The AI Kit, a 12-week cohort focused on practical, responsible AI capability. My project improved [workflow] for [user/community]. I used AI to [assist], checked it by [verification], and kept humans responsible for [decision]. The biggest thing I learned: [lesson].</p></div>
    `,
  })
);

fs.writeFileSync(
  path.join(v1, "09-shareout-and-graduation-kit.html"),
  htmlPage({
    title: "Shareout and Graduation Kit",
    eyebrow: "Demo day",
    intro: "Demo day should feel proud, honest, specific, and connected to next steps. This is not a pitch competition. It is proof of capability.",
    body: `
      <h2>Demo day agenda</h2>
      ${table(["Minute", "Segment", "Owner"], [
        ["0-10", "Welcome, norms, what reviewers should look for.", "Program lead"],
        ["10-70", "Learner demos, five minutes each in small panels.", "Learners"],
        ["70-85", "Panel synthesis: strengths, cautions, opportunities.", "Reviewers"],
        ["85-100", "Certificates and next-step commitments.", "Host"],
        ["100-120", "Open networking and mentor matching.", "Everyone"],
      ])}
      <h2>Five-minute learner demo</h2>
      ${list(["Who the workflow serves", "What the old process looked like", "Where AI helped", "How the learner checked quality and risk", "What changed", "What should happen next"])}
      <h2>Panel feedback form</h2>
      ${table(["Prompt", "Reviewer note"], [
        ["One strength", "What should the learner keep doing?"],
        ["One risk or open question", "What needs checking or guardrails?"],
        ["One pathway suggestion", "What role, project, mentor, or next course fits?"],
        ["Usefulness score", "Would you use, sponsor, interview, or mentor based on this work?"],
      ])}
      <h2>Certificate language</h2>
      <div class="card"><p>This certifies that [Name] completed The AI Kit's 12-week cohort and demonstrated practical AI capability through a real workflow portfolio project, including responsible tool use, source checking, human review, and public or private presentation of evidence.</p></div>
    `,
  })
);

fs.writeFileSync(
  path.join(v1, "10-ai-tool-setup-and-safety.html"),
  htmlPage({
    title: "AI Tool Setup and Safety",
    eyebrow: "Tool pedagogy",
    intro: "The program is model-agnostic. Tools are used to build durable habits and move learners from chat practice to reusable skills to safe, bounded agents.",
    body: `
      <h2>Tool stack</h2>
      <div class="grid two">
        ${card("Minimum", list(["One hosted AI assistant", "One source-grounded notebook or document workspace", "Shared drive or LMS folder", "Spreadsheet tracker", "Video meeting or classroom"]))}
        ${card("Optional", list(["Study mode or guided-learning assistant", "NotebookLM or equivalent", "Canva or slide tool", "Automation sandbox", "Local model for privacy-sensitive demos"]))}
      </div>
      <h2>Chat to Skills to Agents</h2>
      ${table(["Level", "Learner builds", "Readiness gate"], progression)}
      <div class="grid three">
        ${card("Chat artifact", "<p>A saved conversation with context, prompt, output, corrections, source checks, and reflection.</p>")}
        ${card("Skill artifact", "<p>A reusable skill card: when to use it, inputs, prompt, checklist, examples, quality bar, and disclosure rule.</p>")}
        ${card("Agent artifact", "<p>A bounded agent spec: trigger, tools, allowed actions, stop rules, tests, logs, and human approval point.</p>")}
      </div>
      <h2>Ask, Guide, Make, Check, Show</h2>
      ${table(["Mode", "Learner behavior", "Example"], [
        ["Ask", "Turn vague work into better questions.", "What context would make this task clear?"],
        ["Guide", "Use AI as tutor, coach, and critic.", "Ask me questions before giving an answer."],
        ["Make", "Create drafts, maps, templates, prototypes.", "Build a first workflow map from these notes."],
        ["Check", "Verify claims, sources, privacy, and edge cases.", "List what needs human review before use."],
        ["Show", "Explain the work and evidence to another human.", "Write a demo script with limits and next steps."],
      ])}
      <h2>Safety defaults</h2>
      ${list(["No private personal data in public tools.", "Use public, synthetic, or redacted data for practice.", "Disclose AI assistance in portfolio artifacts.", "Keep humans responsible for decisions that affect people.", "Document prompts and verification steps.", "Do not automate high-stakes decisions.", "Escalate privacy, legal, medical, financial, or employment risks."])}
      <h2>Starter prompts</h2>
      ${table(["Purpose", "Prompt"], [
        ["Guided learning", "Act as a coach. Ask me three questions before giving advice. Help me understand the concept instead of just giving the answer."],
        ["Source-grounded study", "Use only the sources I provide. If the source does not support a claim, say so. Create a summary, quiz, and misconception check."],
        ["Verification", "Identify factual claims, assumptions, missing sources, privacy risks, and what a human should review."],
        ["Portfolio story", "Help me explain what I built, what changed, what failed, what I checked, and what should stay human."],
      ])}
    `,
  })
);

fs.writeFileSync(
  path.join(v1, "11-project-bank-chat-skills-agents.html"),
  htmlPage({
    title: "Project Bank: Chat to Skills to Agents",
    eyebrow: "Real buildable projects",
    intro: "Use this bank to give learners concrete projects they can actually build. Every project has a chat version, a reusable skill version, and a bounded agent version with guardrails.",
    current: "projects",
    body: `
      <section class="callout"><h3>The rule</h3><p>No one starts with an agent. Learners first prove they can use chat responsibly, then package the pattern as a reusable skill, then build a bounded agent only when the work is recurring, low-risk, testable, and human-reviewed.</p></section>
      <h2>The progression</h2>
      ${table(["Level", "What learners build", "Readiness gate"], progression)}
      <h2>Agent readiness gates</h2>
      <div class="grid two">
        ${card("Ready for an agent", list(["The task repeats at least weekly.", "Inputs are safe, redacted, public, or synthetic.", "A human approval point is clear.", "Success can be measured.", "Failures are reversible.", "The skill has been tested at least three times."]))}
        ${card("Not ready for an agent", list(["The task affects rights, money, health, grades, employment, or safety.", "The data is sensitive or unapproved.", "The output cannot be checked.", "The learner cannot explain the workflow.", "The partner wants replacement instead of capability."]))}
      </div>
      <h2>Project bank</h2>
      ${table(["Track", "Project", "Chat build", "Skill build", "Agent build", "Inputs", "Success", "Guardrail"], projectBank.map((p) => [p.track, `<strong>${p.title}</strong>`, p.chat, p.skill, p.agent, p.inputs, p.success, p.guardrail]))}
      <h2>Skill card template</h2>
      ${table(["Field", "Prompt"], [
        ["Skill name", "What recurring work pattern does this skill help with?"],
        ["Use when", "What situation makes this skill appropriate?"],
        ["Do not use when", "What risk, data, or decision makes it inappropriate?"],
        ["Inputs", "What sources, notes, examples, or constraints does the learner provide?"],
        ["Prompt pattern", "What reusable prompt or sequence guides the work?"],
        ["Quality checklist", "How does the learner check output before using it?"],
        ["Disclosure", "How should AI assistance be named?"],
        ["Example", "What good output looks like."],
      ])}
      <h2>Agent spec template</h2>
      ${table(["Field", "Prompt"], [
        ["Trigger", "What starts the agent? A file, form response, calendar event, tracker row, or manual button?"],
        ["Allowed tools", "What can the agent read or draft?"],
        ["Forbidden actions", "What must it never do?"],
        ["Memory or state", "What does it need to remember, and where is that stored?"],
        ["Stop rules", "When should it pause and ask a human?"],
        ["Human approval", "Who approves before anything is sent, published, or acted on?"],
        ["Evaluation tests", "What examples must it pass before use?"],
        ["Logs", "What decisions, inputs, outputs, and uncertainties are recorded?"],
      ])}
    `,
  })
);

fs.writeFileSync(
  path.join(v1, "12-one-day-build-sprint-runbook.html"),
  htmlPage({
    title: "1-Day Build Sprint Runbook",
    eyebrow: "Optional on-ramp",
    intro: "Use this when a school, company, or community host wants to see the method before committing to the full 12-week cohort. The sprint is not the program; it is the simplest way to start.",
    body: `
      <section class="callout"><h3>Sprint promise</h3><p>In one day, participants set up tools, learn the Ask-Guide-Make-Check-Show method, build one small AI-assisted workflow artifact, name what should stay human, and decide whether to continue into the 12-week cohort.</p></section>
      <h2>Who it is for</h2>
      <div class="grid three">
        ${card("Schools", "<p>Use it as a low-risk preview for faculty, career services, adult learners, or student success teams.</p>")}
        ${card("Companies", "<p>Use it to identify useful workflow projects and internal champions before a cohort launch.</p>")}
        ${card("Community hosts", "<p>Use it to recruit learners, test access, and prove the program feels achievable.</p>")}
      </div>
      <h2>Minimum setup</h2>
      ${table(["Need", "Minimum"], [
        ["Participants", "12 to 40 people, ideally the same audience you want for the cohort."],
        ["Facilitators", "Two facilitators: one teaches, one helps with tool access and room support."],
        ["Tools", "One AI assistant, shared folder, projector or video room, and a simple project tracker."],
        ["Inputs", "Three sample workflows, one source pack, and one safety scenario."],
        ["Output", "One chat artifact, one reusable skill card, one demo slide, and one next-step commitment."],
      ])}
      <h2>Agenda</h2>
      ${table(["Time", "Segment", "Output"], [
        ["0:00-0:20", "Welcome, why capability matters, room norms, and tool access check.", "Everyone can log in and name one useful work task."],
        ["0:20-0:50", "Demo: Ask, Guide, Make, Check, Show on one familiar task.", "Shared example with visible verification and limits."],
        ["0:50-1:20", "Participant lab: turn a messy task into a useful prompt.", "Saved chat artifact with context, output, and correction."],
        ["1:20-1:35", "Break and facilitator access support.", "No one gets stuck on setup alone."],
        ["1:35-2:15", "Skill card build: convert the useful prompt into a reusable pattern.", "Draft skill card with inputs, checklist, and disclosure rule."],
        ["2:15-2:45", "Safety gate: what should not be automated.", "Human review point and do-not-automate rule."],
        ["2:45-3:30", "Project studio: choose one cohort-worthy workflow.", "Project brief with user, current state, AI assist, and evidence measure."],
        ["3:30-4:15", "Mini demos in groups of four.", "Feedback using Keep, Check, Change."],
        ["4:15-4:45", "Bridge to 12 weeks: map projects into Readiness, Practice, Portfolio.", "Cohort interest list and workflow bank v0."],
        ["4:45-5:00", "Close: next action, support path, and invite to cohort.", "Commitment card and follow-up email list."],
      ])}
      <h2>Facilitator script</h2>
      <div class="grid two">
        ${card("Opening line", "<p>This is not a prompt tricks workshop. Today is about learning how to use AI in a way another human can trust, review, and build on.</p>")}
        ${card("Safety line", "<p>If a task affects rights, money, health, grades, employment, or safety, the AI can assist the work but cannot own the decision.</p>")}
        ${card("Project line", "<p>A good project is small, real, repeatable, testable, and useful even if the first version is boring.</p>")}
        ${card("Close line", "<p>The 12-week cohort is where this becomes durable: one workflow, repeated practice, evidence, portfolio proof, and a demo.</p>")}
      </div>
      <h2>Starter projects</h2>
      ${table(["Project", "Chat build", "Skill build", "Cohort follow-up"], [
        ["Meeting-to-actions", "Turn notes into owners, decisions, risks, and follow-ups.", "Reusable recap skill with approval checklist.", "Build a bounded follow-up draft workflow with logs and review."],
        ["Job fit mapper", "Compare a resume to three job posts and identify gaps.", "Role-fit skill with evidence and learning plan.", "Create a weekly job-search tracker and portfolio story."],
        ["Program planning assistant", "Draft a workshop plan for a local audience.", "Planning skill with accessibility, budget, and run of show.", "Build event operations project with staff review."],
        ["Feedback signal report", "Cluster comments into themes with examples.", "Feedback analysis skill with quality bar.", "Create weekly report prototype and usefulness test."],
      ])}
      <h2>Follow-up within 48 hours</h2>
      ${list(["Send participants their saved artifacts and next steps.", "Invite committed learners to the 12-week cohort application.", "Ask partners which workflows are safe to donate.", "Update the workflow bank and project tracker.", "Publish one short recap that shows capability, not hype."])}
    `,
  })
);

const csv = (rows) => rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n") + "\n";

fs.writeFileSync(path.join(templates, "cohort-roster.csv"), csv([
  ["learner_name", "email", "phone", "access_needs", "role_interest", "workflow_track", "mentor", "attendance_notes", "portfolio_url"],
]));
fs.writeFileSync(path.join(templates, "baseline-survey.csv"), csv([
  ["question", "scale", "when"],
  ["I can explain what AI tools are good and bad at.", "1-5", "week_0_and_week_12"],
  ["I can write a prompt that gives useful context.", "1-5", "week_0_and_week_12"],
  ["I can check AI outputs for accuracy.", "1-5", "week_0_and_week_12"],
  ["I can decide when not to use AI.", "1-5", "week_0_and_week_12"],
  ["I can improve a work or learning task with AI.", "1-5", "week_0_and_week_12"],
  ["I can explain my AI use to another person.", "1-5", "week_0_and_week_12"],
]));
fs.writeFileSync(path.join(templates, "workflow-bank.csv"), csv([
  ["partner", "workflow", "user", "data_status", "risk_level", "reviewer", "week_4_status", "week_9_status", "demo_day_status"],
]));
fs.writeFileSync(path.join(templates, "project-tracker.csv"), csv([
  ["learner", "project_title", "workflow", "artifact_due", "baseline_measure", "current_status", "review_needed", "demo_ready"],
  ...weeks.filter((w) => w.n > 0).map((w) => ["", "", "", `Week ${w.n}: ${w.artifact}`, "", "", "", ""]),
]));
fs.writeFileSync(path.join(templates, "portfolio-rubric.csv"), csv([
  ["dimension", "emerging_1", "capable_3", "strong_5"],
  ["problem_definition", "Vague task", "Clear user and constraints", "Specific user need, baseline, and risk context"],
  ["ai_use", "Hidden or generic", "Named and appropriate", "Precise, limited, and documented"],
  ["verification", "Little checking", "Claims checked", "Systematic, sourced, edge-tested"],
  ["human_judgment", "Unclear", "Approval points named", "Do-not-automate and escalation clear"],
  ["impact_evidence", "Anecdotal", "Before/after measure", "Evidence plus stakeholder review"],
  ["communication", "Hard to explain", "Clear demo", "Honest, concise, role-relevant"],
]));
fs.writeFileSync(path.join(templates, "daily-prompts.csv"), csv([["week", "day", "prompt", "mode"], ...promptRows]));
fs.writeFileSync(path.join(templates, "demo-day-panel-form.csv"), csv([
  ["learner", "project", "one_strength", "one_risk", "pathway_suggestion", "usefulness_score_1_5", "would_follow_up"],
]));
fs.writeFileSync(path.join(templates, "project-bank.csv"), csv([
  ["track", "project", "chat_build", "skill_build", "agent_build", "inputs", "success", "guardrail"],
  ...projectBank.map((p) => [p.track, p.title, p.chat, p.skill, p.agent, p.inputs, p.success, p.guardrail]),
]));
fs.writeFileSync(path.join(templates, "skill-card-template.csv"), csv([
  ["field", "response"],
  ["skill_name", ""],
  ["use_when", ""],
  ["do_not_use_when", ""],
  ["inputs", ""],
  ["prompt_pattern", ""],
  ["quality_checklist", ""],
  ["disclosure_rule", ""],
  ["example_output", ""],
]));
fs.writeFileSync(path.join(templates, "agent-spec-template.csv"), csv([
  ["field", "response"],
  ["agent_name", ""],
  ["trigger", ""],
  ["allowed_tools", ""],
  ["forbidden_actions", ""],
  ["memory_or_state", ""],
  ["stop_rules", ""],
  ["human_approval_point", ""],
  ["evaluation_tests", ""],
  ["logs", ""],
]));
fs.writeFileSync(path.join(templates, "agent-evaluation-log.csv"), csv([
  ["test_name", "input", "expected_behavior", "actual_behavior", "pass_fail", "risk_found", "revision_needed", "human_reviewer"],
]));

function icsDate(dayOffset) {
  const start = new Date(Date.UTC(2026, 8, 14 + dayOffset, 17, 0, 0));
  const end = new Date(start.getTime() + 60 * 60 * 1000);
  const fmt = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  return [fmt(start), fmt(end)];
}

const icsEvents = [];
for (const w of weeks.filter((x) => x.n > 0)) {
  for (let s = 0; s < 3; s++) {
    const [start, end] = icsDate((w.n - 1) * 7 + s * 2);
    icsEvents.push(`BEGIN:VEVENT\nUID:the-ai-kit-w${w.n}-s${s + 1}@theaikit.local\nDTSTAMP:20260524T120000Z\nDTSTART:${start}\nDTEND:${end}\nSUMMARY:The AI Kit W${w.n} Session ${sessionTypes[s][0]} - ${w.title}\nDESCRIPTION:${sessionTypes[s][1]} session. Artifact: ${w.artifact}\nEND:VEVENT`);
  }
}
fs.writeFileSync(path.join(v1, "12-week-cohort-calendar.ics"), `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//The AI Kit//Launch Kit V1//EN\n${icsEvents.join("\n")}\nEND:VCALENDAR\n`);

fs.writeFileSync(
  path.join(v1, "README.md"),
  `# The AI Kit Launch Kit v1

This folder contains the public launch kit for running a 12-week cohort using The AI Kit.

## Start here

1. Open \`00-start-here-program-guide.html\`.
2. Confirm host, learner group, facilitator pair, AI tool access, shared workspace, partner workflows, and demo day date.
3. If the audience needs a preview, run \`12-one-day-build-sprint-runbook.html\` as the on-ramp.
4. Use the templates in \`templates/\` to create your roster, workflow bank, project tracker, baseline survey, and rubric.
5. Run the 36 live sessions in \`03-session-plans.html\`.
6. Use \`11-project-bank-chat-skills-agents.html\` to assign real projects and teach the chat to skills to agents progression.
7. Publish a cohort report after demo day.

License: CC BY-SA 4.0. Adapt it, run it, improve it, and share what you learn.
`
);

fs.writeFileSync(
  path.join(root, "LICENSE.md"),
  `# License

The AI Kit materials are released under Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0), unless otherwise noted.

You may share and adapt the materials for any purpose, including community and commercial use, as long as you provide attribution and distribute adaptations under the same license.

License summary: https://creativecommons.org/licenses/by-sa/4.0/
`
);

fs.writeFileSync(
  path.join(root, ".gitignore"),
  `.DS_Store
node_modules/
*.log
`
);
fs.writeFileSync(path.join(root, ".nojekyll"), "");

const redirectMap = {
  "curriculum.html": "launch-kit/v1/03-session-plans.html",
  "ai-tools.html": "launch-kit/v1/10-ai-tool-setup-and-safety.html",
  "toolkit.html": "launch-kit/index.html",
  "materials.html": "launch-kit/index.html",
  "posts.html": "launch-kit/v1/08-community-comms-pack.html",
  "meeting.html": "research.html#measurement",
};
for (const [file, target] of Object.entries(redirectMap)) {
  fs.writeFileSync(
    path.join(root, file),
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="refresh" content="0; url=${target}"><meta name="robots" content="noindex"><title>Redirecting | The AI Kit</title><link rel="stylesheet" href="claude.css?v=polish-17"></head><body><main class="shell" style="padding:80px 40px"><p class="eyebrow">Redirecting</p><h1>Opening The AI Kit materials.</h1><p class="lede">If you are not redirected, <a href="${target}">continue here</a>.</p></main></body></html>`
  );
}

const readme = `# The AI Kit

The AI Kit is a public, forkable 12-week program that helps communities turn AI access into practical workplace capability through trusted local institutions, real workflows, portfolio proof, and apprenticeship handoff.

## Current public pages

- \`index.html\` - launch site
- \`research.html\` - evidence page and measurement plan
- \`launch-kit/index.html\` - downloadable launch kit
- \`launch-kit/v1/\` - facilitator, learner, employer, measurement, comms, and demo-day materials

Earlier draft routes now redirect into the current launch kit, so public visitors stay in the new experience.

## Launch Kit v1

The launch kit includes:

- Start Here: Run This Program
- 1-Day Build Sprint Runbook
- Facilitator Handbook
- Learner Workbook
- 36 live session plans
- Daily prompts and challenges
- Homework and project briefs
- Employer workflow donation kit
- Measurement and rubrics
- Community comms pack
- Shareout and graduation kit
- AI tool setup and safety guide
- Project bank: chat to skills to agents
- CSV templates and a 12-week calendar file

Downloadable zip: \`launch-kit/downloads/the-ai-kit-launch-kit-v1.zip\`

## Local Preview

Serve the folder with any static server and open \`index.html\`.

## License

CC BY-SA 4.0 unless otherwise noted.
`;
fs.writeFileSync(path.join(root, "README.md"), readme);

const zipPath = path.join(downloads, "the-ai-kit-launch-kit-v1.zip");
try {
  if (fs.existsSync(zipPath)) fs.rmSync(zipPath);
  execFileSync("zip", ["-rq", zipPath, "index.html", "v1", "kit.css"], { cwd: kitRoot });
} catch (err) {
  fs.writeFileSync(path.join(downloads, "ZIP_BUILD_FAILED.txt"), String(err));
}

console.log("Launch kit v1 built.");
