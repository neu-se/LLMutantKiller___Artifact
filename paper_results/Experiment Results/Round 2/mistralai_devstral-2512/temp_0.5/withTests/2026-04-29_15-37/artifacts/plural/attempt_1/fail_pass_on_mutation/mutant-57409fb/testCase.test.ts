import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with numeric input', () => {
  it('should return singular form when num is 1', () => {
    expect(plural('test', 1)).toBe('test');
  });
});