import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('returns the correct plural form of a word', () => {
    const result = plural('wolf', 2);
    expect(result).toBe('wolves');
    const result2 = plural('Stryker was here', 2);
    expect(result2).not.toBe('Stryker was here');
  });
});