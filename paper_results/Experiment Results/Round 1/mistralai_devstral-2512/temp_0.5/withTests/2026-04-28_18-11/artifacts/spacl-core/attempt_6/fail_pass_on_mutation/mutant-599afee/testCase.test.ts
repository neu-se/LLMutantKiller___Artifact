import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule";
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('Rule with context-dependent path matching', () => {
  it('should return false when context property is undefined for middle capture', () => {
    const rule = Rule.for('/start/:middle/end');
    const ctx = { start: 's', end: 'e' }; // middle is undefined
    const result = rule.matches('/start/missing/end', ctx);
    strictEqual(result, false);
  });
});