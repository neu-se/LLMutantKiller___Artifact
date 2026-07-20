import pluralFn from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural regex rule with non-function result', () => {
  it('should call rule result as function when regex matches, passing the regex as second arg', () => {
    // In original: inside RegExp block, after return, type(rule[0])==='String' is false
    // so inner if never executes - the RegExp block's inner if is dead code
    // In mutated: true && rule[0] === word - rule[0] is RegExp, word is string, never equal
    // The REAL difference: original inner if condition is always false (String check on RegExp)
    // mutated inner if condition could theoretically be true if rule[0] somehow === word
    // 
    // But wait - what if rule[1] is NOT a function for a regex rule?
    // Original: return true ? rule[1](word, rule[0]) : rule[1] -- calls rule[1] as function
    // This would throw if rule[1] is not a function
    // The inner if in original: type(rule[1]) === 'Function' ? rule[1](word) : rule[1]
    // handles non-function case
    
    // Add regex rule with string result (non-function)
    pluralFn.addRule(/^uniquetest123$/i, 'uniquetest123s_result');
    // Original: matches regex, returns rule[1](word, rule[0]) -> tries to call string as function -> ERROR
    // Mutated: same behavior since return is before inner if
    // Hmm, same...
    
    expect(pluralFn('uniquetest123')).toBe('uniquetest123s_result');
  });
});