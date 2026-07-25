# Changelog

All notable changes to `pi-evaluate` are documented here.

---

## [0.1.5] — 2026-07-25

### Changed

- Raised `peerDependencies` floor to `>=0.82.0` to reflect tested pi version.

---

## [0.1.4] — 2026-06-17

### Changed

- Raised `peerDependencies` floor to `>=0.79.6` to reflect tested pi version.

---

## [0.1.3] — 2026-05-20

### Changed

- Updated `peerDependencies` from `@mariozechner/pi-coding-agent` to `@earendil-works/pi-coding-agent` following the upstream package scope rename in pi v0.74.0.
- Raised `peerDependencies` floor to `>=0.75.3` to reflect tested pi version.
- Updated `ExtensionAPI` import in `extensions/evaluate.ts` to the new `@earendil-works/pi-coding-agent` scope.

---

## [0.1.2] — 2026-04-29

### Changed

- Raised `peerDependencies` floor to `>=0.70.6` to reflect tested pi version.

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
