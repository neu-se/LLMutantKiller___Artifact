import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should handle words that end with quy correctly', () => {
    expect(plural('quy')).not.toBe(plural('qu'));
    expect(plural('quy')).toBe('quies');
  });
});