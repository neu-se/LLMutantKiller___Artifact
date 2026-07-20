import index from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize words containing x in the middle', () => {
    expect(index('boxer')).toBe('boxers');
    expect(index('max')).toBe('maxes');
    expect(index('ex')).toBe('exes');
    expect(index('ax')).toBe('axes');
    expect(index('fox')).toBe('foxes');
  });
});