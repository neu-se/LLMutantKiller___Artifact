import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural', () => {
  it('should handle the word with specific rules correctly', () => {
    const result = plural('sud');
    expect(result).toBe('suds');
    const result2 = plural('suds');
    expect(result2).toBe('suds');
    const result3 = plural('');
    expect(result3).toBe('s');
  });
});