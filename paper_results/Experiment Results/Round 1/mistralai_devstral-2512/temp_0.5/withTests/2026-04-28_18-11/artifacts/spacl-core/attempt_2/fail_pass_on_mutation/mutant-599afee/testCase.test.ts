import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule";
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('Rule with context-dependent path matching', () => {
  it('should return false when context property does not match path segment', () => {
    const rule = Rule.for('/:foo');
    const ctx = { foo: 'expected' };
    const result = rule.matches('/different', ctx);
    strictEqual(result, false);
  });
});