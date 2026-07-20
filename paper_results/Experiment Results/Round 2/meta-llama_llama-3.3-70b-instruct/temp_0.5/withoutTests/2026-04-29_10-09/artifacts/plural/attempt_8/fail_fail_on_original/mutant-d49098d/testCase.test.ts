import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize words that end with specific suffixes', () => {
    expect(plural('s')).toBe('s'); 
    expect(plural('')).not.toBe('s'); // This test should pass on the original code and fail on the mutated code
  });
});