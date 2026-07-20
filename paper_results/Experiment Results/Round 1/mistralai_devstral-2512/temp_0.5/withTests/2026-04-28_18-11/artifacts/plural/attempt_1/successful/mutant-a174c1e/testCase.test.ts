import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with singular count', () => {
  it('should return the word unchanged when count is 1', () => {
    expect(plural('test', 1)).toBe('test');
  });
});