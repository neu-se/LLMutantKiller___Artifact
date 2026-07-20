import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with words ending in "y"', () => {
  it('should not incorrectly pluralize words containing "y" in the middle', () => {
    expect(plural('myth')).toBe('myths');
  });
});