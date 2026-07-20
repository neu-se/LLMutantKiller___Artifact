import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function behavior with numeric parameter', () => {
  it('should return singular form when num is exactly 1', () => {
    expect(plural('test', 1)).toBe('test');
  });
});