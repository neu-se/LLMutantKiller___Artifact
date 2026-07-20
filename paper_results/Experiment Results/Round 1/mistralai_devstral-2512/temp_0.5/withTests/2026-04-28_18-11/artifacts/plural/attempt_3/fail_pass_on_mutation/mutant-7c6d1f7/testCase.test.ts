import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function behavior for words ending in -o', () => {
  it('should correctly pluralize words ending in vowel-o to "s" and consonant-o to "es"', () => {
    expect(plural('stereo')).toBe('stereos');
    expect(plural('hero')).toBe('heroes');
  });
});