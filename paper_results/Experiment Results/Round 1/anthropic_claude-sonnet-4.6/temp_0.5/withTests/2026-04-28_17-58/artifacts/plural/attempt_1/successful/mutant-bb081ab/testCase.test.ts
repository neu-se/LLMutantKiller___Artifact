import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural with string match and function result', () => {
  it('should call the function when a string rule matches and rule[1] is a function', () => {
    // Add a rule with a string key and a function as the result
    // In original code: type(rule[1]) === 'Function' ? rule[1](word) : rule[1]
    // In mutated code: false ? rule[1](word) : rule[1]  (always returns the function itself)
    plural.addRule('testword', function(w: string) { return w + '_transformed' });
    
    const result = plural('testword');
    
    // Original: calls the function, returns 'testword_transformed'
    // Mutated: returns false branch which is rule[1] (the function itself), not a string
    expect(result).toBe('testword_transformed');
  });
});