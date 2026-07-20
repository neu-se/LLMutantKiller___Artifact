import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly handle rules with functions', () => {
    const testWord = 'cactus';
    const result1 = plural(testWord, 1);
    const result2 = plural(testWord, 2);
    expect(result1).not.toBe(result2); // In the mutated code, this should fail because it always returns the function result
  });
});