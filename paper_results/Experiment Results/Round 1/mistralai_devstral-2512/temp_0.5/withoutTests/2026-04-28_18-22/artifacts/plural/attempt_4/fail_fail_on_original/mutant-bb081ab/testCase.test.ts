import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly handle string-based rules that require function execution', () => {
    expect(plural('child')).toBe('children');
    expect(plural('ox')).toBe('oxen');
    expect(plural('leaf')).toBe('leaves');
  });
});