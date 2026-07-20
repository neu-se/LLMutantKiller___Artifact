import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule";
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('rule matches with context', () => {
  it('should return true when context property matches path segment', () => {
    const rule = Rule.for('/:foo');
    const ctx = { foo: 'bar' };
    const result = rule.matches('/bar', ctx);
    strictEqual(result, true);
  });
});