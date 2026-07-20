import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural', () => {
  it('should handle the word with empty string in rules correctly', () => {
    expect(plural('')).toBe('s');
  });
});