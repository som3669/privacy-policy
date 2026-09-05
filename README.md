# Privacy policies

Public privacy policies for my browser extensions and apps, hosted on GitHub
Pages so each store listing has a stable URL that does not depend on any product
repository staying public.

**Live:** https://som3669.github.io/privacy-policy/

| Product | Kind | Policy URL |
|---|---|---|
| Adwipe | Chrome extension | https://som3669.github.io/privacy-policy/adwipe/ |
| AutoFiller | Chrome extension | https://som3669.github.io/privacy-policy/autofiller/ |
| Hookrate | Chrome extension | https://som3669.github.io/privacy-policy/hookrate/ |
| TabRest | Chrome extension | https://som3669.github.io/privacy-policy/tabrest/ |
| AI Patro | Android app | https://som3669.github.io/privacy-policy/ai-patro/ |

## Why this is a separate repo

Chrome Web Store and Google Play both require a privacy policy URL that stays
reachable, and the store's enforcement note is blunt about drift:
"Inconsistencies between your privacy policy, dashboard disclosures, and actual
behavior violate policies and can result in suspension." A policy hosted from a
product repo dies the moment that repo goes private — a dead policy URL is a
live compliance problem, not a broken link. This repo is public and holds
nothing but policies, so it can stay public regardless of what happens to any
product's source.

## Layout

```
src/<slug>.md        the only source of truth for each policy
products.json        slug, display name, kind, accent colour, summary
tool/render.mjs      renders src/*.md -> <slug>/index.html + landing index.html
<slug>/index.html    generated — do not edit
index.html           generated landing page — do not edit
```

## Editing a policy

1. Edit `src/<slug>.md` and bump its **Last updated** line.
2. `node tool/render.mjs`
3. Commit both the source and the regenerated HTML.

The HTML is committed rather than built in CI so GitHub Pages can serve the repo
root with no build step.

## Adding a product

1. Write `src/<slug>.md`.
2. Add an entry to `products.json`.
3. `node tool/render.mjs`, then commit.

## Markdown subset

`tool/render.mjs` implements a small subset by hand rather than pulling in a
dependency to render five files: ATX headings (`#`–`####`), paragraphs,
unordered lists, tables, horizontal rules, and inline `code`, `**bold**`,
`*italic*` and `[links](url)`. Underscore emphasis (`_like this_`) is **not**
supported — it collided with identifiers such as `host_permissions` — so use
`*` or `**` instead.

## Requirements

Node 18+. No dependencies.
