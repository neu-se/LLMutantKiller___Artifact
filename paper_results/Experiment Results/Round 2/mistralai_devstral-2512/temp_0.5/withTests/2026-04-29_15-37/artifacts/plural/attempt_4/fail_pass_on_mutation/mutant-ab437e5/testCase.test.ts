import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with words ending in "y"', () => {
  it('should correctly handle words ending in "ay"', () => {
    expect(plural('ay')).toBe('ays');
  });
});