import index from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize words ending with x', () => {
    expect(index('max')).toBe('maxes');
    expect(index('box')).toBe('boxes');
    expect(index('ax')).toBe('axes');
    expect(index('ex')).toBe('exes');
  });
});