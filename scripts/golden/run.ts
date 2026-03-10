import { execSync } from 'node:child_process';
import path from 'node:path';

const root = path.resolve(__dirname, '..', '..');

function run(cmd: string) {
  execSync(cmd, { cwd: root, stdio: 'inherit' });
}

run('node scripts/ci/golden_corpus_runner.ts');
console.log('[golden/run] completed local golden corpus gate checks');
