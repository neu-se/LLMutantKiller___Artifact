import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should return the plural form of a word when the number is undefined', () => {
    expect(plural('cat', undefined)).toBe('cats');
  });
});