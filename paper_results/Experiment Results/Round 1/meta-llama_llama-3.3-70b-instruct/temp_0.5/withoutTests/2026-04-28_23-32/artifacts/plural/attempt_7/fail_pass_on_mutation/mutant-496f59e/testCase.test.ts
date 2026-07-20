import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly handle rules with functions', () => {
    const testWord = 'wolf';
    const result = plural(testWord, 2);
    expect(result).toBe('wolves'); // In the mutated code, this should be 'wolfs' instead of 'wolves'
  });
});