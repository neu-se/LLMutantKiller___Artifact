import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should return the plural form of a word when the number is not 1 and return the singular form when the number is 1', () => {
    expect(plural('cat', 2)).toBe('cats');
    expect(plural('cat', 1)).toBe('cat');
  });
});