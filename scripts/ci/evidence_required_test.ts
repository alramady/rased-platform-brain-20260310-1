import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(__dirname, '..', '..');
const aiServiceDir = path.join(root, 'services', 'ai-service');

function allFiles(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === 'dist') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) allFiles(full, out);
    else if (entry.isFile() && full.endsWith('.ts')) out.push(full);
  }
  return out;
}

if (!fs.existsSync(aiServiceDir)) {
  console.warn('[evidence_required_test] SKIP: ai-service not found');
  process.exit(0);
}

const files = allFiles(aiServiceDir);

// Restrict this gate to explicit job-event emitters instead of any generic "completed" wording.
const jobEventPattern = /JOB\/(COMPLETED|RESULT_READY|EVIDENCE_READY)/;
const completedHandlers = files.filter((f) => jobEventPattern.test(fs.readFileSync(f, 'utf8')));

if (completedHandlers.length === 0) {
  console.warn('[evidence_required_test] SKIP: no explicit JOB/* completion handlers found');
  process.exit(0);
}

const offenders: string[] = [];
for (const file of completedHandlers) {
  const src = fs.readFileSync(file, 'utf8');
  const hasEvidenceGuard = /evidence_id|evidenceId|artifact_ids|artifactIds/.test(src);
  if (!hasEvidenceGuard) offenders.push(path.relative(root, file));
}

if (offenders.length > 0) {
  console.error('[evidence_required_test] completion paths missing evidence/artifact references:\n' + offenders.join('\n'));
  process.exit(1);
}

console.log(`[evidence_required_test] PASS (${completedHandlers.length} handlers checked)`);
