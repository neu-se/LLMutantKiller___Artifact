import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('returns the correct plural form of a word', () => {
    expect(plural('wolf', 2)).toBe('wolves');
    const rules = plural.addRule;
    expect(rules).toBeInstanceOf(Function);
    expect(typeof rules).toBe('function');
    expect(rules.length).toBe(2);
  });
});