import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('returns the correct plural form of a word', () => {
    const originalRulesLength = plural.addRule.length;
    plural.addRule('test', 'tests');
    expect(plural.addRule.length).toBe(originalRulesLength + 1);
  });
});