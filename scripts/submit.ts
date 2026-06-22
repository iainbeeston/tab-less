import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const { name, version } = JSON.parse(readFileSync('package.json', 'utf8')) as {
  name: string;
  version: string;
};
const zip = (suffix: string) => `.output/${name}-${version}-${suffix}.zip`;

const run = (wxtArguments: string[]) => {
  const { status, error } = spawnSync('wxt', wxtArguments, { stdio: 'inherit' });
  if (error) {
    console.error(`Failed to run wxt: ${error.message}`);
    process.exit(1);
  }
  if (status !== 0) process.exit(status ?? 1);
};

run(['zip']);
run(['zip', '-b', 'firefox']);

run([
  'submit',
  '--chrome-zip', zip('chrome'),
  '--firefox-zip', zip('firefox'),
  '--firefox-sources-zip', zip('sources'),
  ...process.argv.slice(2),
]);
