import test from 'node:test';
import assert from 'node:assert/strict';
import {join} from 'node:path';
import {grade, root} from '../src/grade.mjs';
import {cases} from '../src/cases.mjs';

for (const id of Object.keys(cases)) {
  test(`${id}: rejects the original bug, accepts the upstream fix`, async () => {
    const broken = await grade(id, join(root, 'fixtures', id, 'index.js'));
    const fixed = await grade(id, join(root, 'test', 'known-fixes', id, 'index.js'));
    assert.ok(broken.passed < broken.total, JSON.stringify(broken));
    assert.equal(fixed.passed, fixed.total, JSON.stringify(fixed));
    assert.equal(fixed.error, undefined);
    assert.ok(broken.checks.some(check => !check.passed));
  });
}
