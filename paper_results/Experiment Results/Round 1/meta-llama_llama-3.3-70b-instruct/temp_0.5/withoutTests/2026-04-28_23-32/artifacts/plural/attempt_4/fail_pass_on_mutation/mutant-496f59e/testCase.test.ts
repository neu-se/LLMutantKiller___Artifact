import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly handle rules with functions', () => {
    const testWord = 'wolf';
    const result = plural(testWord, 2);
    expect(result).not.toBe('wolf');
    expect(result).toBe('wolves');
  });
});