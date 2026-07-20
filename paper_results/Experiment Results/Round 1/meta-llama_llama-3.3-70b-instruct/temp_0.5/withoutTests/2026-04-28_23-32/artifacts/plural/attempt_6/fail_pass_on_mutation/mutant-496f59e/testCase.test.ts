import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly handle rules with functions', () => {
    const testWord = 'cherry';
    const result = plural(testWord, 2);
    expect(result).toBe('cherries'); 
  });
});