import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize words ending with a vowel followed by "o"', () => {
    expect(plural('studio')).toBe('studios');
    expect(plural('radio')).toBe('radios');
    expect(plural('zoo')).toBe('zoos');
  });
});