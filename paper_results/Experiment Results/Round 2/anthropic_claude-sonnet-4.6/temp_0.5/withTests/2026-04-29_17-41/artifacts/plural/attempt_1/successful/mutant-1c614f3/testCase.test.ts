import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural with exact string match rule using function result', () => {
  it('should call the function result when an exact string match rule has a function as its result', () => {
    // Add a rule with an exact string key and a function as the result
    plural.addRule('testword123', function(w: string) { return w + '_plural' });
    
    // In the original code, the function is called and returns 'testword123_plural'
    // In the mutated code, type(rule[1]) === "" is always false, so it returns the function itself
    const result = plural('testword123');
    
    expect(result).toBe('testword123_plural');
  });
});