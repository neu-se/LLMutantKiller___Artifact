import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function behavior for words ending in -o', () => {
  it('should correctly pluralize words ending in consonant-o to "es"', () => {
    expect(plural('hero')).toBe('heroes');
    expect(plural('potato')).toBe('potatoes');
    expect(plural('tomato')).toBe('tomatoes');
  });
});