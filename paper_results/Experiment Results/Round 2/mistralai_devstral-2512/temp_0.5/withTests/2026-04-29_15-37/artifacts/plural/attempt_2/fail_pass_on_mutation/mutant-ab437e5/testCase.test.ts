import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with words ending in "y"', () => {
  it('should not incorrectly pluralize words ending in "y" when not at the end of the word', () => {
    expect(plural('day')).toBe('days');
  });
});