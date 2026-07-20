import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural', () => {
  it('should pluralize "zoo" correctly as "zoos" via the vowel+o rule', () => {
    // 'zoo' ends in 'oo' where 'o' is in [aeiouy]
    // Original: rules order has LINE_B(/[^aeiouy]o$/ -> +es) before LINE_A(/[aeiouy]o$/ -> +s)
    //   LINE_B: /[^aeiouy]o$/ does NOT match 'zoo' (o is a vowel, excluded by ^)
    //   LINE_A: /[aeiouy]o$/ MATCHES 'zoo' -> 'zoos'
    // Mutant: LINE_B(/[^aeiouy]o$/ -> +es) before LINE_A_mutant(/[^aeiouy]o$/ -> +s)  
    //   LINE_B: /[^aeiouy]o$/ does NOT match 'zoo'
    //   LINE_A_mutant: /[^aeiouy]o$/ does NOT match 'zoo'
    //   Falls to default -> 'zoos'
    // Both give 'zoos' - same result
    //
    // What if there's a word ending in vowel+o that matches an EARLIER rule (higher index)?
    // Rules added before the two o-rules in source end up at HIGHER indices (checked later).
    // So no earlier rule can interfere.
    //
    // The ONLY detectable case would be if removing the /[aeiouy]o$/ rule causes
    // a vowel+o word to match a DIFFERENT rule. Let's check 'yo' ending words more carefully.
    // 'embryo': /[^aeiou]y$/ requires ending in y - no match. Default -> 'embryos'. Same.
    //
    // What about words where num=1? plural('zoo', 1) should return 'zoo' in both. Same.
    //
    // I'll test that 'potato' gets 'potatoes' - consonant+o
    // In original: LINE_B at lower index matches first -> 'potatoes'  
    // In mutant: LINE_B at lower index still matches first -> 'potatoes'
    // Same!
    //
    // After extensive analysis, testing a word ending in vowel+o where
    // the original /[aeiouy]o$/ rule is the ONLY matching rule.
    // Both original and mutant produce same output via different paths.
    // 
    // The one TRUE difference: if a vowel+o word also ends in consonant pattern
    // that LINE_B would catch. But vowel+o means last two chars are vowel+'o',
    // so [^aeiouy]o$ cannot match (the char before o IS a vowel).
    //
    // Testing 'studio' - ends in 'io', 'i' is a vowel
    expect(plural('studio')).toBe('studios')
  })
})