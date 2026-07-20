import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule";
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('Rule with context-dependent path matching', () => {
  it('should return false when context property is undefined in path with multiple captures', () => {
    const rule = Rule.for('/:foo/:bar');
    const ctx = { foo: 'test' }; // bar is undefined
    const result = rule.matches('/test/missing', ctx);
    strictEqual(result, false);
  });
});