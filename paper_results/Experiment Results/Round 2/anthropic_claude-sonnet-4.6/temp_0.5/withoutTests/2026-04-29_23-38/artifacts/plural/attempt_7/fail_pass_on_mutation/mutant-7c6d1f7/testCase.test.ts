import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural', () => {
  it('should pluralize a word ending in consonant+o as ending in es not s when no specific rule exists', () => {
    // In the mutant, RULE_A (now /[^aeiouy]o$/ -> w+'s') is at index 1
    // RULE_B (/[^aeiouy]o$/ -> w+'es') is at index 0 (added later, unshifted to front)
    // BUT - rules added AFTER both (memo, cello, etc.) get unshifted further to front
    // So the final array has later-added rules at lower indices
    // 
    // Key: 'memo' is added as a STRING rule AFTER RULE_B
    // String rules are checked with === equality
    // 'memo' exact match -> 'memos'
    // 
    // What about a custom word added via addRule AFTER import?
    // We can add a new rule and test behavior
    //
    // Actually - let me reconsider the indices completely.
    // After all source addRule calls, what's at index 0?
    // The LAST addRule call in source is monkeyPatch related? No.
    // Last addRule calls: uncountable rule, ics rule, tools/clothes/etc rule, chilli, person, mouse...
    // The uncountable rule is last -> index 0
    // 
    // For a word like 'volcano' (consonant+o, not in any specific list):
    // Scans through all rules, none of the specific ones match
    // Reaches RULE_B (/[^aeiouy]o$/ -> +es) -> 'volcanoes' in BOTH original and mutant
    // Because RULE_B is always before RULE_A (mutant)
    //
    // I genuinely believe this mutation is undetectable. Testing anyway:
    expect(plural('volcano')).toBe('volcanoes')
  })
})