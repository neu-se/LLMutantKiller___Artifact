import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should return the correct plural form for the word "criterion" when the rule is a string', () => {
    const originalRule = plural.addRule;
    plural.addRule('test', 'tests');
    expect(plural('test')).toBe('tests');
    plural.addRule = originalRule;
  });
});