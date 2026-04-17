# Changelog

All notable changes to `pi-evaluate` are documented here.

---

## [0.1.1] — 2026-04-17

### Changed

- Raised `peerDependencies` floor to `>=0.67.6` to document tested pi version.

---

## 0.1.0 — 2026-03-30

Initial release.

- `evaluate` skill: adversarial post-execute evaluator inspired by the GAN discriminator pattern
- Reespec mode: auto-detects `reespec/requests/`, loads `brief.md` + `specs/` as contract
- Standalone mode: prompts user for freeform contract text when no reespec project is detected
- Verdict engine: per-capability verdicts (SATISFIED / PARTIAL / UNSATISFIED / UNCLEAR)
- Triage summary: safe to skip / worth a look / human call
- pi extension entry point: registers `evaluate` skill via `resources_discover`
