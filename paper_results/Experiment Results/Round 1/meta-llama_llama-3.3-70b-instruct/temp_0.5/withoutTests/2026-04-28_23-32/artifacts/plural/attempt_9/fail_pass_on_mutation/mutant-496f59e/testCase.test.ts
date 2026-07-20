import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly handle rules with functions', () => {
    const testWord = 'cactus';
    const result1 = plural(testWord, 1);
    expect(result1).toBe(testWord); 
    const result2 = plural(testWord, 2);
    expect(result2).toBe('cacti'); 
  });
});