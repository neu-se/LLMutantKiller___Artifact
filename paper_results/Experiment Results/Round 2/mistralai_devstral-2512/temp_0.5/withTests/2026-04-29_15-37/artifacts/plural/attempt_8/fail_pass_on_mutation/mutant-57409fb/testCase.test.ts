import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with numeric input', () => {
  it('should return singular form when num is 1 and undefined check is working', () => {
    expect(plural('test', 1)).toBe('test');
    expect(plural('box', 1)).toBe('box');
    expect(plural('child', 1)).toBe('child');
  });
});