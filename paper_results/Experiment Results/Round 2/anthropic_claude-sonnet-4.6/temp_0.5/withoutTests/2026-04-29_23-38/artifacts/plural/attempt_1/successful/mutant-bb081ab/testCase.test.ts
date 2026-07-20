import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";
import { addRule } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural string rule with function value', () => {
  it('should call the function when a string rule matches with a function result', () => {
    // Add a rule with a string key and a function value
    // The mutation changes: type(rule[1]) === 'Function' ? rule[1](word) : rule[1]
    // to: false ? rule[1](word) : rule[1]
    // This means if rule[1] is a function, the original calls it, but the mutation returns the function itself
    addRule('testword', function(w: string) { return w + '_transformed' });
    
    const result = plural('testword');
    
    // Original: calls the function, returns 'testword_transformed'
    // Mutated: returns the function itself (not a string)
    expect(result).toBe('testword_transformed');
  });
});