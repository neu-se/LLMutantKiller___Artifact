import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should return the singular form when num is 1', () => {
    expect(plural('cat', 1)).toBe('cat');
    expect(plural('cat', 2)).toBe('cats');
  });
});