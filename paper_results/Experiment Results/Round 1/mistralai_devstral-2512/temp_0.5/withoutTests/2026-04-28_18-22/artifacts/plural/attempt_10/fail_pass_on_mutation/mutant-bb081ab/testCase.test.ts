import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly handle string-based rules that require function execution', () => {
    expect(plural('potato')).toBe('potatoes');
    expect(plural('tomato')).toBe('tomatoes');
    expect(plural('hero')).toBe('heroes');
  });
});