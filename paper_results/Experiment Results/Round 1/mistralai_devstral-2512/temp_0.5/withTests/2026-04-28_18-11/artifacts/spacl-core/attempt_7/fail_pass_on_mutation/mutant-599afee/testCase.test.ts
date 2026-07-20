import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule";
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('Rule with context-dependent path matching', () => {
  it('should return false when context property is undefined for wildcard with capture', () => {
    const rule = Rule.for('/+/:foo/*');
    const ctx = { bar: 'test' }; // foo is undefined
    const result = rule.matches('/segment/missing/other', ctx);
    strictEqual(result, false);
  });
});