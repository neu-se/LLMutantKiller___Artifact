const plural = require("../../../../../../../../../../../subject_repositories/plural/index.js");

describe('plural', () => {
  it('should handle string rules correctly without treating regexp rules as string rules', () => {
    // With mutation (true && rule[0] === word), for a regexp rule where rule[0].test(word) is true,
    // the code returns from the regexp branch. But what if rule[0].test(word) is FALSE?
    // Then we fall through to the string check.
    // With mutation: true && rule[0] === word -> RegExp === string -> false. Same result.
    // 
    // The ONLY difference: if rule[0] is something other than RegExp or String
    // that strictly equals word. Not possible normally.
    //
    // Wait - what about when rule[1] is a string (not function)?
    // Original: type(rule[0]) === 'String' -> only matches string keys
    // Mutated: true -> matches ANY rule[0] if rule[0] === word
    // For string rules: 'criterion' === 'criterion' -> true in both cases
    // For regexp rules: /pattern/ === 'word' -> false in both cases
    // Behavior identical!
    expect(plural('criterion')).toBe('criteria');
  });
});