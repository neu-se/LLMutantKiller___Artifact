import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly handle rules with functions', () => {
    const testWord = 'dwarf';
    const result1 = plural(testWord, 2);
    expect(result1).toBe('dwarfs'); 
    const testWord2 = 'wolf';
    const result2 = plural(testWord2, 2);
    expect(result2).toBe('wolves'); 
  });
});