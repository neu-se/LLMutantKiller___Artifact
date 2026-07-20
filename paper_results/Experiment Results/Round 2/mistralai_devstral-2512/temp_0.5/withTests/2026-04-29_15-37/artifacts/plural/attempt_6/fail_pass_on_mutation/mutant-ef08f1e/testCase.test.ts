import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function behavior with words ending in "o"', () => {
  it('should correctly handle words ending in "o" with vowel before it', () => {
    expect(plural('zoo')).toBe('zoos');
  });
});