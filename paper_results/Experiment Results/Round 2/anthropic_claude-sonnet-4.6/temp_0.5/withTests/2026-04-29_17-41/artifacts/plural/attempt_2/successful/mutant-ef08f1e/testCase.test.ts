import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural stereo rule anchor', () => {
  it('should correctly pluralize words ending in consonant+y that also contain a vowel+o pattern', () => {
    expect(plural('boozy')).toBe('boozies');
  });
});