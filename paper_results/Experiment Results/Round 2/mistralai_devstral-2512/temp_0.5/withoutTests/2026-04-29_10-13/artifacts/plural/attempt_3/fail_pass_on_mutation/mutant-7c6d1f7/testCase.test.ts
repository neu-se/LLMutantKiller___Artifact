import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize words ending with vowel + "o"', () => {
    expect(plural('radio', 2)).toBe('radios');
    expect(plural('studio', 2)).toBe('studios');
    expect(plural('video', 2)).toBe('videos');
  });
});