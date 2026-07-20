import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule";
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('Rule with context-dependent path matching', () => {
  it('should return false when context property is undefined', () => {
    const rule = Rule.for('/:foo');
    const ctx = { bar: 'baz' }; // foo is undefined in context
    const result = rule.matches('/test', ctx);
    strictEqual(result, false);
  });
});