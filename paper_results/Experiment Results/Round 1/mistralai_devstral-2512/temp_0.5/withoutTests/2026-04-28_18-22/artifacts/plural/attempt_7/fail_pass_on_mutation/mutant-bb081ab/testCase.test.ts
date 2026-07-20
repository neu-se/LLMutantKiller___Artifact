import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly handle string-based rules that require function execution', () => {
    expect(plural('chilli')).toBe('chillies');
    expect(plural('cherry')).toBe('cherries');
    expect(plural('baby')).toBe('babies');
  });
});