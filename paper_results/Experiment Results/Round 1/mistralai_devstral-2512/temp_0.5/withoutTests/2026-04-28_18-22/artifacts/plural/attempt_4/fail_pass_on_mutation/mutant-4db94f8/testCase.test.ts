import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly handle string rules when type check is mutated', () => {
    // Test with a word that matches a string rule
    expect(plural('criterion', 2)).toBe('criteria');
    // Test with a word that matches a regex rule
    expect(plural('cherry', 2)).toBe('cherries');
    // Test with a word that doesn't match any rule
    expect(plural('test', 2)).toBe('tests');
  });
});