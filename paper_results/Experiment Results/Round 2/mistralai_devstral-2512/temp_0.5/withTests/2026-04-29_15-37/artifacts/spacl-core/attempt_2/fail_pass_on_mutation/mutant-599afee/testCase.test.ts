import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule";
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('rule matches with context', () => {
  it('should return false when context property does not match path segment', () => {
    const rule = Rule.for('/:foo');
    const ctx = { foo: 'bar' };
    const result = rule.matches('/baz', ctx);
    strictEqual(result, false);
  });
});