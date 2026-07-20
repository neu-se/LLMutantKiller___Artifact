import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize words ending with "quy" followed by other characters', () => {
    expect(plural('soliloquyX')).toBe('soliloquyXs');
  });
});