import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(__dirname, '..', '..');
const corpusRoot = path.join(root, 'golden_corpus');

const requiredInputs = ['pdf', 'image_table', 'excel_bundle'];
const requiredExpected = ['strict_gate.md', 'excel_structured_cells.md', 'dashboard_permission_gate.md', 'editable_docx_gate.md'];

function ensureDir(p: string) {
  if (!fs.existsSync(p)) {
    console.error(`[golden_corpus_runner] missing directory: ${path.relative(root, p)}`);
    process.exit(1);
  }
}

ensureDir(corpusRoot);
ensureDir(path.join(corpusRoot, 'inputs'));
ensureDir(path.join(corpusRoot, 'expected'));

for (const name of requiredInputs) {
  const p = path.join(corpusRoot, 'inputs', name);
  if (!fs.existsSync(p)) {
    console.error(`[golden_corpus_runner] missing input fixture: ${path.relative(root, p)}`);
    process.exit(1);
  }
}

for (const name of requiredExpected) {
  const p = path.join(corpusRoot, 'expected', name);
  if (!fs.existsSync(p)) {
    console.error(`[golden_corpus_runner] missing expected gate definition: ${path.relative(root, p)}`);
    process.exit(1);
  }
}

console.log('[golden_corpus_runner] PASS (fixtures and expected gate specs are present)');
