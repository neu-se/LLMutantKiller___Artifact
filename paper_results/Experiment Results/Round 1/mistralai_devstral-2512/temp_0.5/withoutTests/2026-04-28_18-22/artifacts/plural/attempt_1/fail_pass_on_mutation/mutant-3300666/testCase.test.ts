import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should handle basic pluralization correctly', () => {
    expect(plural('apple')).toBe('apples');
  });
});