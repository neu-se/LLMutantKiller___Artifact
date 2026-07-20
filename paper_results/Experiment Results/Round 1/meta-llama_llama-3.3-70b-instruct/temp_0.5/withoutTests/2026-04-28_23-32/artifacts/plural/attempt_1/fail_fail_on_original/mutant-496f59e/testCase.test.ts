import { plural } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly handle rules with functions', () => {
    const testWord = 'test';
    const testRule = /test$/i;
    const testResult = 'tested';
    const originalRulesLength = plural.rules.length;
    plural.addRule(testRule, function(w) { return testResult });
    expect(plural(testWord, 2)).toBe(testResult);
    expect(plural.rules.length).toBe(originalRulesLength + 1);
  });
});