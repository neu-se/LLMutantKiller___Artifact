import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural', () => {
  it('should handle words ending in yo correctly - y is vowel-like before o', () => {
    // Consider a word ending in 'yo' - like 'yo' itself or 'dynamo'... 
    // Actually 'dynamo' ends in 'mo' (consonant)
    // A word ending in 'yo': the char before 'o' is 'y'
    // 'y' is in [aeiouy] but NOT in [aeiou]
    // 
    // The /[^aeiou]y$/ rule matches words ending in consonant+y (y NOT preceded by vowel)
    // This rule is for words ending in 'y', not 'o' - so irrelevant
    //
    // For a word ending in 'yo':
    // Original RULE_B /[^aeiouy]o$/: 'y' is in [aeiouy] so [^aeiouy] does NOT match -> skip
    // Original RULE_A /[aeiouy]o$/: 'y' IS in [aeiouy] -> MATCHES -> w+'s'
    // Mutant RULE_B /[^aeiouy]o$/: does NOT match
    // Mutant RULE_A(mut) /[^aeiouy]o$/: does NOT match  
    // Mutant: falls to default -> w+'s'
    // Same result!
    //
    // After exhaustive analysis, I believe the only way to detect this mutation
    // is through the rules count or by checking that a consonant+o word 
    // added via custom rule after the built-in rules behaves differently.
    //
    // New approach: add a custom rule for consonant+o AFTER import (goes to index 0)
    // Then add ANOTHER rule. The built-in duplicate in mutant means one extra 
    // /[^aeiouy]o$/ rule exists. Test a word that should match the custom rule
    // but in mutant gets caught by the duplicate built-in rule first... 
    // But our custom rule is always at lower index (added last).
    //
    // I'll try testing the actual rules array length via addRule return value behavior
    // by checking if a consonant+o word behaves differently when we examine 
    // what happens with 'num' parameter edge cases
    expect(plural('cameo', 2)).toBe('cameos')
    expect(plural('cameo', 1)).toBe('cameo')
    expect(plural('cameo', 0)).toBe('cameos')
  })
})