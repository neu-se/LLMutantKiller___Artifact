import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural ics rule', () => {
  it('should not pluralize words ending in -ics when they appear mid-word or have suffix', () => {
    // The original rule /ics$/i only matches words ending in 'ics'
    // The mutated rule /ics/i matches any word containing 'ics' anywhere
    // A word like 'tactics' should remain 'tactics' (ends in ics)
    // But a word like 'kickstart' contains 'ick' not 'ics'
    // We need a word that contains 'ics' but NOT at the end
    // such that the mutated regex matches it but the original doesn't
    
    // 'icstest' is not a real word but let's think of something better
    // The mutation changes /ics$/i to /ics/i
    // So a word like 'tactics' would match both (ends in ics)
    // But a word like 'kicksomething' - no, that doesn't have 'ics'
    // 
    // Let's think: what word contains 'ics' NOT at the end?
    // 'kickstart' - no 'ics'
    // We need something like 'icsomething' or 'somethingicsmore'
    // 
    // Actually the key difference: with /ics$/i, 'tactics' matches (returns 'tactics')
    // With /ics/i, 'tactics' still matches (returns 'tactics')
    // 
    // The difference would be for a word that has 'ics' NOT at the end
    // For example, a word ending in 'icss' or 'icses' - but those aren't real
    // 
    // Wait - the rules are applied in order (unshift means last added = first checked)
    // The /ics$/i rule returns the word unchanged
    // The mutated /ics/i would also match words containing 'ics' not at end
    // 
    // Example: 'icsomething' - contains 'ics' at start, not end
    // With original /ics$/i: no match -> falls through to default -> 'icsomethings'
    // With mutated /ics/i: matches -> returns 'icsomething' (no plural)
    
    // Let's use a contrived but valid test: a word starting with 'ics'
    // Actually let's think about real scenarios...
    // 'kickstart' -> no 'ics'
    // What about checking that 'tactics' still works (both should return 'tactics')
    // and then find a word where they differ
    
    // A word like 'icsomething' - not real, but tests the regex difference
    // Better: use a word that has 'ics' in the middle
    // 'icsland' - not real
    
    // The most reliable test: word with 'ics' not at end
    // Original: no match for /ics$/ -> returns word + 's'  
    // Mutated: matches /ics/ -> returns word unchanged
    
    const result = plural('icsland')
    // Original /ics$/i: 'icsland' does NOT end in 'ics', so no match -> 'icslands'
    // Mutated /ics/i: 'icsland' CONTAINS 'ics', so matches -> returns 'icsland'
    expect(result).toBe('icslands')
  })
})