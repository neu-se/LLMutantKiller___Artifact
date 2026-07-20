import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly handle string-based rules that require function execution', () => {
    expect(plural('leaf')).toBe('leaves');
    expect(plural('loaf')).toBe('loaves');
    expect(plural('shelf')).toBe('shelves');
  });
});