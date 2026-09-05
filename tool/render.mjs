// Render every policy in src/*.md to a hostable HTML page under <slug>/index.html,
// plus the landing index.html that links them.
//
// Each policy has exactly one source of truth: the markdown in src/. The Chrome
// Web Store's enforcement note is blunt about why that matters —
// "Inconsistencies between your privacy policy, dashboard disclosures, and
// actual behavior violate policies and can result in suspension." Keeping a
// hand-written HTML copy alongside the markdown is how that inconsistency
// happens six months later, so the pages are generated.
//
//   node tool/render.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC_DIR = path.join(ROOT, 'src');
const BASE_URL = 'https://som3669.github.io/privacy-policy';

const products = JSON.parse(fs.readFileSync(path.join(ROOT, 'products.json'), 'utf8'));

const escape = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Inline markdown: code, bold, italics, links. Applied after escaping. */
function inline(text) {
  return escape(text)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

/**
 * A deliberately small markdown subset — headings, paragraphs, lists, tables,
 * rules. Enough for these documents, and small enough to read in one sitting
 * rather than pulling in a dependency to render five files.
 */
function render(markdown) {
  const lines = markdown.split(/\r?\n/);
  const out = [];
  let i = 0;

  const flushParagraph = (buffer) => {
    if (buffer.length) out.push(`<p>${inline(buffer.join(' '))}</p>`);
    buffer.length = 0;
  };
  const paragraph = [];

  while (i < lines.length) {
    const line = lines[i];

    if (/^\s*$/.test(line)) {
      flushParagraph(paragraph);
      i++;
      continue;
    }

    const heading = line.match(/^(#{1,4})\s+(.*)$/);
    if (heading) {
      flushParagraph(paragraph);
      const level = heading[1].length;
      out.push(`<h${level}>${inline(heading[2])}</h${level}>`);
      i++;
      continue;
    }

    if (/^---+\s*$/.test(line)) {
      flushParagraph(paragraph);
      out.push('<hr />');
      i++;
      continue;
    }

    // Table: header row, separator, then body until a blank line.
    if (/^\|/.test(line) && /^\|[\s:|-]+\|/.test(lines[i + 1] || '')) {
      flushParagraph(paragraph);
      const cells = (row) =>
        row
          .replace(/^\||\|$/g, '')
          .split('|')
          .map((c) => c.trim());

      const head = cells(line);
      i += 2;
      const body = [];
      while (i < lines.length && /^\|/.test(lines[i])) {
        body.push(cells(lines[i]));
        i++;
      }
      out.push(
        '<table><thead><tr>' +
          head.map((c) => `<th>${inline(c)}</th>`).join('') +
          '</tr></thead><tbody>' +
          body
            .map((row) => '<tr>' + row.map((c) => `<td>${inline(c)}</td>`).join('') + '</tr>')
            .join('') +
          '</tbody></table>'
      );
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      flushParagraph(paragraph);
      const items = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(`<li>${inline(lines[i].replace(/^\s*[-*]\s+/, ''))}</li>`);
        i++;
      }
      out.push(`<ul>${items.join('')}</ul>`);
      continue;
    }

    paragraph.push(line.trim());
    i++;
  }
  flushParagraph(paragraph);
  return out.join('\n');
}

const styles = (accent) => `
  :root { color-scheme: light dark; }
  body {
    margin: 0 auto; padding: 40px 22px 96px; max-width: 760px;
    font: 16px/1.65 -apple-system, "Segoe UI", Roboto, system-ui, sans-serif;
    color: #16161a; background: #fff;
  }
  @media (prefers-color-scheme: dark) {
    body { color: #e9e9ec; background: #121214; }
    td, th { border-color: #2e2e33 !important; }
    hr { border-color: #2e2e33 !important; }
    code { background: #1e1e22 !important; }
    .mark, .card { background: #1e1e22 !important; border-color: #2e2e33 !important; }
    .card:hover { border-color: #46464e !important; }
    .muted { color: #9a9aa2 !important; }
  }
  h1 { font-size: 30px; line-height: 1.2; margin: 0 0 6px; }
  h2 { font-size: 21px; margin: 38px 0 10px; }
  h3 { font-size: 17px; margin: 26px 0 8px; }
  h4 { font-size: 16px; margin: 20px 0 6px; }
  p, li { font-size: 16px; }
  ul { padding-left: 22px; }
  a { color: ${accent}; }
  code {
    font: 14px/1.5 ui-monospace, SFMono-Regular, Consolas, monospace;
    background: #f2f2f4; padding: 1px 5px; border-radius: 4px;
  }
  table { border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 15px; }
  th, td { border: 1px solid #e2e2e5; padding: 8px 10px; text-align: left; vertical-align: top; }
  th { font-weight: 600; }
  hr { border: 0; border-top: 1px solid #e2e2e5; margin: 34px 0; }
  .mark {
    display: flex; align-items: center; gap: 10px;
    border: 1px solid #e2e2e5; background: #f8f8f9;
    border-radius: 10px; padding: 10px 14px; margin-bottom: 28px; font-size: 14px;
  }
  .dot { width: 10px; height: 10px; border-radius: 50%; background: ${accent}; flex: none; }
  .muted { color: #6b6b73; }
  .back { display: inline-block; margin-top: 44px; font-size: 14px; }
`;

const page = ({ title, description, accent, body }) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escape(title)}</title>
<meta name="description" content="${escape(description)}" />
<style>${styles(accent)}</style>
</head>
<body>
${body}
</body>
</html>
`;

let count = 0;

for (const product of products) {
  const src = path.join(SRC_DIR, `${product.slug}.md`);
  if (!fs.existsSync(src)) {
    console.error(`missing source: src/${product.slug}.md`);
    process.exitCode = 1;
    continue;
  }

  const html = page({
    title: `Privacy Policy — ${product.name}`,
    description: `Privacy policy for ${product.name}. ${product.summary}`,
    accent: product.accent,
    body: [
      `<div class="mark"><span class="dot"></span><span>${escape(product.name)} · ${escape(product.kind)}</span></div>`,
      render(fs.readFileSync(src, 'utf8')),
      '<a class="back" href="../">&larr; All privacy policies</a>',
    ].join('\n'),
  });

  const outDir = path.join(ROOT, product.slug);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html);
  console.log(
    `src/${product.slug}.md -> ${product.slug}/index.html  (${(html.length / 1024).toFixed(1)} KB)`
  );

  count++;
}

const cards = products
  .map(
    (p) => `<a class="card" href="${p.slug}/">
  <span class="dot" style="background:${p.accent}"></span>
  <span class="card-text">
    <strong>${escape(p.name)}</strong>
    <span class="muted">${escape(p.kind)} — ${escape(p.summary)}</span>
  </span>
</a>`
  )
  .join('\n');

const landing = page({
  title: 'Privacy Policies',
  description: 'Privacy policies for Som Shrestha’s browser extensions and apps.',
  accent: '#16161a',
  body: `<h1>Privacy policies</h1>
<p class="muted">Policies for my browser extensions and apps. None of them have an
account, an analytics pipeline or an advertising SDK, and none of them sell data.
Each page states exactly what its product reads, what it stores on your own
device, and — where anything leaves the device at all — what is sent and to
whom.</p>
<div class="grid">
${cards}
</div>
<p class="muted back">Source: <a href="https://github.com/som3669/privacy-policy">github.com/som3669/privacy-policy</a></p>
<style>
  .grid { display: grid; gap: 10px; margin: 28px 0 0; }
  .card {
    display: flex; align-items: flex-start; gap: 12px; text-decoration: none;
    border: 1px solid #e2e2e5; background: #f8f8f9; border-radius: 10px;
    padding: 14px 16px; color: inherit;
  }
  .card:hover { border-color: #c9c9d0; }
  .card .dot { margin-top: 6px; }
  .card-text { display: flex; flex-direction: column; gap: 3px; }
  .card-text .muted { font-size: 14px; }
</style>`,
});

fs.writeFileSync(path.join(ROOT, 'index.html'), landing);
console.log('products.json -> index.html');
console.log(`\n${count} polic${count === 1 ? 'y' : 'ies'} rendered. Served at:`);
for (const p of products) console.log(`  ${BASE_URL}/${p.slug}/`);
