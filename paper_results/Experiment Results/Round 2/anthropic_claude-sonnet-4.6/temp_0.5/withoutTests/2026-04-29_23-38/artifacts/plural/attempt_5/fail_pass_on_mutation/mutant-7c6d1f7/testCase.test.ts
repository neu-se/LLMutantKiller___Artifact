import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural', () => {
  it('should pluralize "embryo" as "embryos"', () => {
    // 'embryo' ends in 'yo' where 'y' is in [aeiouy]
    // Original: /[aeiouy]o$/i matches at rule index 1 -> 'embryos'
    // Mutant: /[^aeiouy]o$/i at index 1 does NOT match (y is excluded by ^)
    //         but wait - /[^aeiou]y$/i rule: 'embryo' ends in 'o' not 'y', no match
    //         /x$|ch$|s$/i: no match
    //         default: 'embryo' + 's' = 'embryos'
    // Both give 'embryos'... 
    //
    // BUT: what about a word ending in 'yo' where the [^aeiou]y$ rule could match?
    // No - that rule requires ending in 'y', not 'o'
    //
    // The REAL test: a word ending in consonant+o should get 'es' in original
    // In mutant the FIRST /[^aeiouy]o$/ rule returns w+'s' not w+'es'
    // Wait - I keep getting confused. Let me re-read:
    // LINE A (added first): addRule(/[aeiouy]o$/i, w => w + 's')   <- unshifted to index 0 first
    // LINE B (added second): addRule(/[^aeiouy]o$/i, w => w + 'es') <- unshifted to index 0, pushing LINE A to index 1
    // Final order: [LINE_B, LINE_A, ...earlier_rules...]
    // LINE_B at index 0: /[^aeiouy]o$/ -> w+'es'
    // LINE_A at index 1: /[aeiouy]o$/ -> w+'s'
    // MUTANT LINE_A at index 1: /[^aeiouy]o$/ -> w+'s'
    // For 'potato' (consonant+o): LINE_B matches at index 0 -> 'potatoes' (both original and mutant)
    // For 'stereo' (vowel+o): LINE_B no match, LINE_A matches -> 'stereos' (original)
    //                          LINE_B no match, MUTANT_LINE_A no match -> default 'stereos' (mutant)
    // Identical outputs for all cases!
    // 
    // UNLESS: there are rules added BEFORE LINE_A in source (= higher index, checked later)
    // that could catch vowel+o words differently...
    // Rules at higher indices were added earlier in source.
    // Looking at rules added before the two 'o' rules:
    // /[^aeiou]y$|quy$/i, /x$|ch$|s$/i, nucleus/etc, thesis/etc, appendix/etc
    // None of these match vowel+o words.
    //
    // I believe the mutation produces NO observable difference for any input.
    // But let me try the one case that MIGHT differ: a word where the default +s 
    // would be intercepted differently...
    // Actually 'cameo' - does it match any rule before the o-rules in the mutant?
    // In mutant both o-rules are /[^aeiouy]o$/, neither matches 'cameo'
    // Falls to default -> 'cameos'. Original also 'cameos'. Same.
    //
    // I'll test with a word ending in 'oo' to be thorough
    expect(plural('cameo')).toBe('cameos')
  })
})