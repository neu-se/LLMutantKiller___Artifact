import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule";
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('Rule with context-dependent path matching', () => {
  it('should return false when context property is undefined in path with multiple segments', () => {
    const rule = Rule.for('/:foo/bar/:baz');
    const ctx = { foo: 'test' }; // baz is undefined
    const result = rule.matches('/test/bar/missing', ctx);
    strictEqual(result, false);
  });
});