import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural with string match and function result', () => {
  it('should call the function when a string rule matches with a function result', () => {
    // Add a rule with string match and function result
    plural.addRule('testword', function(w: string) { return 'transformed_' + w });
    
    // In original: type(rule[1]) === 'Function' is true, so rule[1](word) is called -> 'transformed_testword'
    // In mutated: type(rule[1]) === "" is false, so rule[1] is returned -> the function itself
    const result = plural('testword');
    
    expect(result).toBe('transformed_testword');
  });
});