import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should return the singular form of a word when the number is 1', () => {
    expect(plural('cat', 1)).toBe('cat');
  });
});