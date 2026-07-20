import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should return the plural form of a word based on the provided number', () => {
    expect(plural('cat', 1)).toBe('cat');
    expect(plural('cat', 2)).toBe('cats');
    expect(plural('cat', undefined)).toBe('cats');
    expect(plural('cat', false)).toBe('cat');
  });
});