import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function behavior with words ending in "o"', () => {
  it('should correctly handle words ending in "o" with a consonant before it', () => {
    expect(plural('hero')).toBe('heroes');
    expect(plural('potato')).toBe('potatoes');
    expect(plural('tomato')).toBe('tomatoes');
  });
});