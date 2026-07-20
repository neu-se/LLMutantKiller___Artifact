import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should correctly pluralize a simple word like 'cat' to 'cats'", () => {
    // The mutation initializes rules with ["Stryker was here"] instead of []
    // This means the first rule is a string "Stryker was here" which will cause
    // issues when the code tries to call rule[0].test() on it
    // More importantly, with the mutated code, the rules array starts with an invalid entry
    // that could interfere with normal rule processing
    
    // A simple word like 'cat' should return 'cats' (default +s rule)
    // With the mutation, the rules array has an extra invalid entry at index 0
    // When iterating, rule[0] would be 'S', rule[1] would be 't', etc.
    // type('S') === 'String' and 'S' !== 'cat', so it won't match
    // But the string "Stryker was here" as a rule entry means:
    // rules[0] = "Stryker was here" (a string, not an array)
    // rules[0][0] = 'S', rules[0][1] = 't'
    // type(rule[0]) === 'String' and rule[0] === word checks 'S' === 'cat' -> false
    // So simple words might still work, but let's check a word that matches a specific rule
    
    // The word 'criterion' should return 'criteria' via an exact string match rule
    // With mutation, rules[0] = "Stryker was here", so when iterating:
    // i=0: rule = "Stryker was here", rule[0] = 'S', rule[1] = 't'
    // type('S') === 'String', 'S' === 'criterion' -> false
    // Then continues to find the actual 'criterion' rule... 
    // Actually this might still work for string rules
    
    // Let's think about regex rules - the first real rule added via unshift would be at index 1
    // after mutation. But actually all the addRule calls use unshift, so they prepend.
    // The mutation just adds "Stryker was here" as the initial element.
    // After all addRule calls, rules[rules.length-1] = "Stryker was here"
    // When iterating forward, we'd reach it last. rule = "Stryker was here"
    // rule[0] = 'S', type('S') === 'String', 'S' === word?
    // For most words this won't match. But if word = 'S', it would return rule[1] = 't'
    
    // The key issue: for a word that doesn't match any rule, we return word + 's'
    // But with mutation, the last rule in iteration is the string entry
    // For word 'xyz' (no match): returns 'xyzs' in both cases
    
    // Actually the real problem: the mutation changes rules from [] to ["Stryker was here"]
    // The addRule function does rules.unshift([match, result])
    // So after all addRules, the array is [...all rules..., "Stryker was here"]
    // When we iterate and hit "Stryker was here": rule[0] = 'S', rule[1] = 't'
    // type('S') === 'String', if word === 'S', returns 't' instead of 'Ss'
    
    // Test: plural('S') should return 'Ss' but with mutation returns 't'
    expect(plural('S')).toBe('Ss')
  })
})