import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should return the singular form of a word when the number is not 1 or undefined', () => {
    expect(plural('cat', false)).toBe('cat');
  });
});