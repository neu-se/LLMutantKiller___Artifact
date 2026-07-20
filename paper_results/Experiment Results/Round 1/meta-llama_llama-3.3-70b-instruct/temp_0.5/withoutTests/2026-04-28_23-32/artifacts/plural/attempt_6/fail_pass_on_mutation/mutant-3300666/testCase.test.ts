import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('returns the correct plural form of a word', () => {
    const rules = plural.addRule;
    rules('wolf', 'wolves');
    expect(plural('wolf', 2)).toBe('wolves');
  });
});