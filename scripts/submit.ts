import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

if (existsSync('.env.submit')) {
  process.loadEnvFile('.env.submit');
}

const { name, version } = JSON.parse(readFileSync('package.json', 'utf8')) as {
  name: string;
  version: string;
};
const zip = (suffix: string) => `.output/${name}-${version}-${suffix}.zip`;
const extraArguments = process.argv.slice(2);

const run = (command: string, commandArguments: string[]) => {
  const { status, error } = spawnSync(command, commandArguments, { stdio: 'inherit' });
  if (error) {
    console.error(`Failed to run ${command}: ${error.message}`);
    process.exit(1);
  }
  if (status !== 0) process.exit(status ?? 1);
};

run('wxt', ['zip']);
run('wxt', ['zip', '-b', 'firefox']);

run('wxt', [
  'submit',
  '--chrome-zip', zip('chrome'),
  '--firefox-zip', zip('firefox'),
  '--firefox-sources-zip', zip('sources'),
  ...extraArguments,
]);

if (!extraArguments.includes('--dry-run')) {
  const tag = `v${version}`;
  const tagExists =
    spawnSync('git', ['rev-parse', '-q', '--verify', `refs/tags/${tag}`]).status === 0;
  if (tagExists) {
    console.log(`Tag ${tag} already exists, skipping.`);
  } else {
    run('git', ['tag', '-a', tag, '-m', `Release ${tag}`]);
    const push = spawnSync('git', ['push', 'origin', tag], { stdio: 'inherit' });
    if (push.status !== 0) {
      console.error(`Created tag ${tag} but failed to push it. Run: git push origin ${tag}`);
    }
  }
}
