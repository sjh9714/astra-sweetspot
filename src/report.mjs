import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
import {root} from './grade.mjs';

export async function loadResults() {
  return JSON.parse(await readFile(join(root, 'results', 'pilot.json'), 'utf8'));
}

export function table(rows) {
  const lines = ['Case            Model / effort   Checks  Seconds  Input     Cached    Output'];
  for (const row of rows) {
    const model = row.requestedModel === 'gpt-6-astra' ? 'Astra' : 'Sol';
    const usage = row.usage;
    const format = value => value == null ? '?' : value.toLocaleString('en-US');
    lines.push([
      row.case.padEnd(16), `${model} ${row.effort}`.padEnd(17),
      `${row.verification.passed}/${row.verification.total}`.padEnd(8),
      row.elapsedSeconds.toFixed(1).padEnd(9), format(usage.input_tokens).padEnd(10),
      format(usage.cached_input_tokens).padEnd(10), format(usage.output_tokens),
      row.status !== 'completed' ? ` [${row.status}]` : '',
    ].join(''));
  }
  return lines.join('\n');
}
