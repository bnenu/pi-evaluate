# pi-evaluate

An adversarial post-execute evaluation skill for [pi](https://github.com/mariozechner/pi-coding-agent).

After a complex execution, you're staring at a large diff and don't know where to look. `pi-evaluate` reads your contract (what you asked for) and your outputs (what was built), then tells you exactly where to focus — and what you can safely skip.

Inspired by the **GAN discriminator pattern**: a second agent that sees only the contract and the output, never the implementation plan, and returns a structured verdict.

---

## What it does

`pi-evaluate` acts as an adversarial discriminator:

- Reads your **contract** — brief + specs (reespec), or freeform text you paste in
- Reads your **actual outputs** — files, test results, documents
- Returns a **structured verdict per capability**: ✅ SATISFIED / ⚠️ PARTIAL / ❌ UNSATISFIED / ❓ UNCLEAR
- Produces a **triage summary**: safe to skip, worth a look, human call

It does NOT read `tasks.md`, `design.md`, or any implementation intent. It is blind to the "how" — it only judges whether the "what" was delivered.

It does NOT fix gaps. It reports them. You decide what to do.

---

## Installation

```bash
npm install pi-evaluate
```

Then restart pi or run `/reload`. The `evaluate` skill will appear in your available skills.

---

## Reespec mode

If you use [reespec](https://github.com/your-org/reespec), `pi-evaluate` detects your project automatically.

After completing an execute phase, invoke the skill:

```
/skill:evaluate
```

The evaluator will:
1. Detect your active reespec request
2. Load `brief.md` and `specs/` as the contract silently
3. Scan your outputs
4. Return a verdict per spec capability + triage summary

Example output:

```
Evaluating request: my-feature

### user-auth-capability
verdict:  ⚠️ PARTIAL
reason:   brief says "support OAuth and password login" — found OAuth handler,
          no password login handler found in src/auth/
focus:    src/auth/ — password login handler is missing

### error-handling-capability
verdict:  ✅ SATISFIED
reason:   all error paths covered in tests/errors.test.mjs

## Triage
✅ Safe to skip:   error-handling, logging
⚠️  Worth a look:  user-auth (password login missing)
```

---

## Standalone mode

No reespec? No problem. The skill works with any project.

Invoke it:

```
/skill:evaluate
```

You'll be asked:

> "What's the contract? Paste your original ask, acceptance criteria, or whatever defines done."

Paste anything — a paragraph, a bullet list, a copied ticket, a Slack message. No structure required.

Example:

```
What's the contract?

> Build a user settings page. It should let users change their email and password.
> There should be a confirmation dialog before saving. Mobile-friendly. No external
> auth libraries.

(contract: user-supplied)

### change-email
verdict:  ✅ SATISFIED
reason:   src/settings/email.tsx exists, email change form found with validation

### change-password
verdict:  ⚠️ PARTIAL
reason:   password field found but no confirmation dialog present in src/settings/
focus:    src/settings/ — confirmation dialog before save is missing

### mobile-friendly
verdict:  ❓ UNCLEAR
reason:   contract says "mobile-friendly" but no breakpoints or responsive tests defined —
          cannot verify without clearer criteria
focus:    human call — define what mobile-friendly means for this project

## Triage
✅ Safe to skip:   change-email
⚠️  Worth a look:  change-password (missing confirmation dialog)
❓  Human call:    mobile-friendly (underspecified)
```

---

## The GAN idea

[GANs (Generative Adversarial Networks)](https://arxiv.org/abs/1406.2661) pit two neural networks against each other: a **generator** that creates fake data, and a **discriminator** that judges whether the data is real or fake. The discriminator never sees how the generator made the data — it only sees the output and the training data (what "real" looks like).

`pi-evaluate` borrows this pattern:

| GAN | pi-evaluate |
|---|---|
| Generator | Your agent (execute phase) |
| Discriminator | The evaluator skill |
| Training data ("real") | The contract (brief + specs) |
| Generated output ("fake") | The implementation |
| "Is this real?" | "Does this satisfy the contract?" |

The key insight: **the discriminator is blind to implementation intent**. It can't be charitable about what the generator "meant to do" — it only sees what exists. This is what makes it useful. A self-review by the same agent that built the thing will always be biased. A blind discriminator won't.

---

## Verdicts

| Label | Meaning |
|---|---|
| ✅ SATISFIED | All requirements for this capability are clearly present |
| ⚠️ PARTIAL | Some requirements present, some missing |
| ❌ UNSATISFIED | No evidence of this capability in the outputs |
| ❓ UNCLEAR | Contract is too underspecified to judge — flag for human |

---

## Philosophy

- **Optional** — never a hard gate. You decide what to do with the verdict.
- **Adversarial** — looks for gaps, not confirmation. Absence of evidence is flagged.
- **Focused** — the triage summary is the primary output. The human reads this first.
- **Honest about uncertainty** — UNCLEAR is not failure. It means your contract needs more detail.

---

## License

MIT

---

Made with [reespec](https://reespec.dev) and ♥ in EU
