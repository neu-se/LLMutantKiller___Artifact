import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural', () => {
  it('should not pluralize words ending in -ics when they appear mid-word or with suffixes', () => {
    // The original rule /ics$/i only matches words ending in 'ics'
    // The mutated rule /ics/i matches any word containing 'ics' anywhere
    // A word like 'physics' should remain 'physics' with original code
    // but a word like 'kickstart' contains 'ick' not 'ics'
    // Let's use a word that ends in 'ics' - should stay the same
    expect(plural('physics')).toBe('physics')
    
    // Now test a word that CONTAINS 'ics' but doesn't END in 'ics'
    // With original /ics$/i - this word would NOT match the ics rule
    // With mutated /ics/i - this word WOULD match the ics rule and return unchanged
    // We need a word where the ics rule would wrongly prevent pluralization
    // 'statics' ends in 'ics' so both would match - not useful
    // We need a word containing 'ics' but not ending in 'ics'
    // e.g., 'icsicle' doesn't exist, but let's think...
    // 'picnic' -> 'picnics' - contains 'ics' after adding 's'? No, 'picnic' itself doesn't contain 'ics'
    // What about a word like 'tactics' - ends in 'ics', both match
    // The key difference: /ics$/i only matches at end, /ics/i matches anywhere
    // So if we pluralize a word that CONTAINS 'ics' but not at the end...
    // 'kickstand' - no 'ics'
    // Let's think: what word contains 'ics' not at end?
    // The word itself needs to be pluralized, so it shouldn't end in 'ics'
    // but should contain 'ics' somewhere
    // Example: a made-up scenario - but we need real behavior
    // Actually, the simplest test: words ending in 'ics' should not be pluralized
    // Both rules handle this. The difference is for words CONTAINING 'ics' elsewhere.
    // 'icsicle' - not real. But what about checking that 'graphics' stays 'graphics'?
    expect(plural('graphics')).toBe('graphics')
    expect(plural('mathematics')).toBe('mathematics')
    expect(plural('statistics')).toBe('statistics')
    
    // The real difference: with /ics/i (mutated), a word like 'picnic' 
    // would be caught if it contained 'ics' - but 'picnic' doesn't
    // Let's try 'icsicle' type words... 
    // Actually 'politics' ends in 'ics' - both match
    // The mutation changes $ anchor removal - so words that have 'ics' NOT at end
    // would be affected. Let's construct such a test:
    // 'icsicle' is fake. What about checking plural('tactics') = 'tactics'?
    // Both original and mutated would return 'tactics' for this.
    // 
    // The REAL difference: /ics/i without $ would match 'icsomething' 
    // where the word has 'ics' in the middle. Let's use addRule to test indirectly.
    // 
    // Actually the simplest observable difference: 
    // plural('icsicle') - with original, no ics$ match, goes to default +s = 'icsicles'
    // with mutated, ics match, returns 'icsicle'
    expect(plural('icsicle')).toBe('icsicles')
  })
})