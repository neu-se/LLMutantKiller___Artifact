import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with words ending in "quy"', () => {
  it('should correctly pluralize mixed case words ending in "QuY"', () => {
    expect(plural('soliloQuY')).toBe('soliloQuiES');
  });
});