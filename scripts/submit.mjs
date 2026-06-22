import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const { name, version } = JSON.parse(readFileSync('package.json', 'utf8'));
const zip = (suffix) => `.output/${name}-${version}-${suffix}.zip`;

const run = (wxtArguments) => {
  const { status, error } = spawnSync('wxt', wxtArguments, { stdio: 'inherit' });
  if (error) {
    console.error(`Failed to run wxt: ${error.message}`);
    process.exit(1);
  }
  if (status !== 0) process.exit(status ?? 1);
};

run(['zip']);
run(['zip', '-b', 'firefox']);
run(['zip', '-b', 'edge']);

run([
  'submit',
  '--chrome-zip', zip('chrome'),
  '--firefox-zip', zip('firefox'),
  '--firefox-sources-zip', zip('sources'),
  '--edge-zip', zip('edge'),
  ...process.argv.slice(2),
]);
