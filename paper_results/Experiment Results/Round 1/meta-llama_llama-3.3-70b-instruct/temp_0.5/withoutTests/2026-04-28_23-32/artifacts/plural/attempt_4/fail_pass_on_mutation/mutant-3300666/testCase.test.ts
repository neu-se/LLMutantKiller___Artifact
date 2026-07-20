import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('returns the correct plural form of a word', () => {
    expect(plural('cat', 2)).toBe('cats');
    expect(plural('dog', 1)).toBe('dog');
    expect(plural('city', 2)).toBe('cities');
    expect(plural('Stryker was here', 2)).toBe('Stryker was heres');
  });
});