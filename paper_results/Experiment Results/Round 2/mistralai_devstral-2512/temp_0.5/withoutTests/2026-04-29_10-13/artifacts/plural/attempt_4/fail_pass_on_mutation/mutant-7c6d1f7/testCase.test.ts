import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly handle words ending with consonant + "o"', () => {
    expect(plural('potato', 2)).toBe('potatoes');
    expect(plural('tomato', 2)).toBe('tomatoes');
    expect(plural('hero', 2)).toBe('heroes');
  });
});