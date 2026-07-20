import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should return the plural form of "cherry" as "cherries"', () => {
    expect(plural('cherry')).toBe('cherries');
  });
});