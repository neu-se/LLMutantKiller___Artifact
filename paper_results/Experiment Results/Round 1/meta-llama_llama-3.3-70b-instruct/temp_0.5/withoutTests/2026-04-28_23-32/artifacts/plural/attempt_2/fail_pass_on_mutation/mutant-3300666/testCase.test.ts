import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('returns the correct plural form of a word', () => {
    expect(typeof plural).toBe('function');
    expect(plural('cat', 2)).toBe('cats');
    expect(plural('dog', 1)).toBe('dog');
    expect(plural('city', 2)).toBe('cities');
  });
});