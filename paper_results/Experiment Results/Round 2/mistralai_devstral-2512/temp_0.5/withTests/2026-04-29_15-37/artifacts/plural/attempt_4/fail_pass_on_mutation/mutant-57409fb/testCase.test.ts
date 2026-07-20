import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with numeric input', () => {
  it('should return singular form when num is 1 and undefined is not passed', () => {
    expect(plural('test', 1)).toBe('test');
    expect(plural('box', 1)).toBe('box');
  });
});