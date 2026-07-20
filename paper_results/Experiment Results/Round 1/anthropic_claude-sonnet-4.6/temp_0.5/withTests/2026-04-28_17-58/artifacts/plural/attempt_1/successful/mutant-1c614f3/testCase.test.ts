import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural with string rule and function handler', () => {
  it('should call the function handler when a string rule matches', () => {
    // Add a rule with a string key and a function value
    // In the original code: type(rule[1]) === 'Function' is true, so rule[1](word) is called
    // In the mutated code: type(rule[1]) === "" is always false, so rule[1] (the function itself) is returned
    const testWord = 'uniquetestword_xyz123';
    const expectedResult = 'uniquetestword_xyz123_transformed';
    
    plural.addRule(testWord, function(w: string) {
      return w + '_transformed';
    });

    const result = plural(testWord);
    
    // In original: result === 'uniquetestword_xyz123_transformed' (string)
    // In mutated: result === [Function] (the function itself, not its return value)
    expect(result).toBe(expectedResult);
    expect(typeof result).toBe('string');
  });
});