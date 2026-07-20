import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should return the singular form of a word when the number is 1 and plural form when the number is not 1 or undefined', () => {
    expect(plural('cat', 1)).toBe('cat');
    expect(plural('cat', undefined)).toBe('cats');
    expect(plural('cat', null)).toBe('cats');
    expect(plural('cat', false)).toBe('cat');
  });
});