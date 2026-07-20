import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly handle words ending with "o" preceded by a vowel when followed by other characters', () => {
    expect(plural('studio')).toBe('studios');
  });
});