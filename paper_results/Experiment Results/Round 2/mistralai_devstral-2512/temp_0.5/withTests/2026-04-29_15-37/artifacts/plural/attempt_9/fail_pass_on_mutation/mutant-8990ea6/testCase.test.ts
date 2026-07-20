import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with words ending in "quy"', () => {
  it('should correctly handle case-insensitive matching for words ending in "quy"', () => {
    expect(plural('QUY')).toBe('QUies');
  });
});