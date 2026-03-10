import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(__dirname, '..', '..');
const serviceRoot = path.join(root, 'services');

function walk(dir: string, acc: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (entry.isFile() && (full.endsWith('.ts') || full.endsWith('.js'))) acc.push(full);
  }
  return acc;
}

const files = walk(serviceRoot);
const executeEndpoints = files.filter((f) => fs.readFileSync(f, 'utf8').includes('/tools/execute'));

if (executeEndpoints.length === 0) {
  console.error('[tool_schema_validate] no /tools/execute endpoints found under services');
  process.exit(1);
}

const invalid: string[] = [];
for (const file of executeEndpoints) {
  const src = fs.readFileSync(file, 'utf8');
  const hasEnvelope = /ToolEnvelope/i.test(src);
  const hasSchemaValidation = /(zod|joi|class-validator|ajv|schema|validate\()/.test(src);
  if (!hasEnvelope || !hasSchemaValidation) invalid.push(path.relative(root, file));
}

if (invalid.length > 0) {
  console.error('[tool_schema_validate] endpoints missing ToolEnvelope/schema validation:\n' + invalid.join('\n'));
  process.exit(1);
}

console.log(`[tool_schema_validate] PASS (${executeEndpoints.length} endpoints checked)`);
