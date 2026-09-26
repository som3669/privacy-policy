# privacy-policy

Public GitHub Pages site (github.com/som3669/privacy-policy) hosting privacy policies for
som3669's extensions and apps, so store URLs survive product repos going private.
Created 2026-09-05 (moved out of the public all-combine-repo). Moved locally from
`C:\tmp\privacy-policy` on 2026-09-24.

## URLs (base https://som3669.github.io/privacy-policy/)
- `adwipe/`, `autofiller/`, `hookrate/`, `tabrest/` — Chrome extensions
- `ai-patro/` — Android app; linked from Play listing, `ai_patro/brand/store-listing.md`
  and in-app `lib/presentation/widgets/privacy_policy_screen.dart`
- `sunau/` — Android app; source copied from `sunau/docs/privacy-policy.md` (drop its HTML
  comment). The in-app copy is `sunau/lib/features/privacy/domain/privacy_policy_text.dart`;
  all three must match, plus Play Data safety (ML Kit diagnostics = collected, not shared)

## Layout
- `src/<slug>.md` — only source of truth · `products.json` — slug, name, kind, accent, summary
- `tool/render.mjs` — renders to `<slug>/index.html` + landing `index.html` (generated,
  committed, never hand-edit). Node 18+, no deps.

## Edit / add a policy
1. Edit or create `src/<slug>.md`, bump its **Last updated** line; new product → add to `products.json`.
2. `node tool/render.mjs`, commit source + HTML together.
- Markdown subset only; no `_underscore_` emphasis (use `*`/`**`).
- Policy must match actual app behaviour and store declarations (drift = suspension risk).
  AI Patro: discloses Groq API calls, gist holiday fetch, and "contains ads"; keep the
  in-app screen in sync when changing it.
