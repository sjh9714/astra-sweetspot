#!/usr/bin/env node
import {loadResults, table} from '../src/report.mjs';
import {cases, models, efforts} from '../src/cases.mjs';
import {runTrial} from '../src/runner.mjs';
import {grade} from '../src/grade.mjs';
import {resolve} from 'node:path';

const help = `Astra Sweetspot — real bugs, inspectable patches, one-command reproduction.

astra-sweetspot                         Show bundled results; makes no model call
astra-sweetspot report --json           Print the bundled receipts as JSON
astra-sweetspot run abort-delay --model astra --effort medium
astra-sweetspot grade abort-delay /path/to/index.js

Cases: ${Object.keys(cases).join(', ')}
Models: ${Object.keys(models).join(', ')}; efforts: ${efforts.join(', ')}
Run requires Node 20+, Git, Codex CLI 0.153.0+, and an existing Codex login.
Only run invokes a model and consumes your account's usage. Timeout: 180s;
override with --timeout 10..900. A disposable copy of the public fixture is
used. Runs stay in ~/.astra-sweetspot/runs; nothing is uploaded automatically.
`;

try {
  const [command = 'report', ...args] = process.argv.slice(2);
  if (['--help', '-h', 'help'].includes(command)) console.log(help);
  else if (command === 'report') {
    if (args.length > 1 || (args.length === 1 && args[0] !== '--json')) throw new Error('Use report or report --json.');
    const report = await loadResults();
    if (args[0] === '--json') console.log(JSON.stringify(report, null, 2));
    else {
      console.log('Astra Sweetspot | a small task experiment, not a model leaderboard\n');
      console.log(report.runs.length ? table(report.runs) : 'Pilot measurements are not bundled yet.');
      console.log('\nOne run per condition. Cached input is part of input. Tokens are not subscription quota.');
      console.log('Inspect methods, patches and sources: https://github.com/sjh9714/astra-sweetspot');
      console.log('\nReproduce: npx astra-sweetspot run abort-delay --model astra --effort medium');
    }
  } else if (command === 'run') {
    const [id, ...flags] = args;
    const options = {id, model: 'astra', effort: 'medium'};
    const seen = new Set();
    for (let index = 0; index < flags.length; index += 2) {
      const name = flags[index];
      if (!['--model', '--effort', '--timeout'].includes(name) || seen.has(name) || flags[index + 1] === undefined) throw new Error('Expected --model, --effort, or --timeout, each with one value.');
      seen.add(name);
      options[name.slice(2)] = name === '--timeout' ? Number(flags[index + 1]) : flags[index + 1];
    }
    if (!Object.hasOwn(cases, id) || !Object.hasOwn(models, options.model) || !efforts.includes(options.effort)) throw new Error('Choose a listed case, model, and effort. See --help.');
    console.log(`Running ${id} with ${models[options.model]} / ${options.effort}. This consumes Codex usage.`);
    const {receipt, directory} = await runTrial(options);
    console.log(table([receipt]));
    console.log(`\nReceipt, patch, and private logs: ${directory}`);
    if (receipt.status !== 'completed' || receipt.verification.passed !== receipt.verification.total) process.exitCode = 1;
  } else if (command === 'grade') {
    if (args.length !== 2) throw new Error('Use grade <case> <candidate index.js>.');
    const result = await grade(args[0], resolve(args[1]));
    console.log(JSON.stringify(result, null, 2));
    if (result.passed !== result.total) process.exitCode = 1;
  } else { throw new Error('Unknown command. See astra-sweetspot --help.'); }
} catch (error) {
  console.error(`Sweetspot: ${error.message}`);
  process.exitCode = 1;
}
