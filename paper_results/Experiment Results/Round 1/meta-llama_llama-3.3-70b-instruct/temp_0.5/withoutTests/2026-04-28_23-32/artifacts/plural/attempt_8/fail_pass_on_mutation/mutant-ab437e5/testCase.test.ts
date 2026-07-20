import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize words that end in a consonant followed by y', () => {
    expect(plural('ay', 2)).toBe('ays');
    expect(plural('ayy', 2)).toBe('ayies');
  });
});