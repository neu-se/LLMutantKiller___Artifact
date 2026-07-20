import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should handle the first rule correctly for words ending with "y"', () => {
    const result = plural('cherry');
    expect(result).toBe('cherries');
    expect(result).not.toBe('Stryker was here');
  });
});