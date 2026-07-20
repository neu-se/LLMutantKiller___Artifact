import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule";
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('rule matches with context', () => {
  it('should return false when context property is undefined and path segment is non-empty', () => {
    const rule = Rule.for('/:foo');
    const ctx = { foo: undefined };
    const result = rule.matches('/value', ctx);
    strictEqual(result, false);
  });
});