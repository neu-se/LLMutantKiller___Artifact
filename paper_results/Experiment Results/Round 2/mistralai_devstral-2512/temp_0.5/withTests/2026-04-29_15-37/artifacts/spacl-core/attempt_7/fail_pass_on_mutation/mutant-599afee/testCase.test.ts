import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule";
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('rule matches with context', () => {
  it('should return false when context property is undefined and path has a matching segment', () => {
    const rule = Rule.for('/:test');
    const ctx = { test: undefined };
    const result = rule.matches('/segment', ctx);
    strictEqual(result, false);
  });
});