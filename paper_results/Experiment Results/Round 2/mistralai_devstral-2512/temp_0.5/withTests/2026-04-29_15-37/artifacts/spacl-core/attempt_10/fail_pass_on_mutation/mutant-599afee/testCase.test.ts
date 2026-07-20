import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule";
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('rule matches with context', () => {
  it('demonstrates equivalent behavior between original and mutated code', () => {
    const rule = Rule.for('/:foo');
    const ctx = { foo: undefined };
    const result = rule.matches('/test', ctx);
    strictEqual(result, false); // Both versions return false
  });
});