import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural', () => {
  it('should pluralize a word ending in yo with s not es', () => {
    // 'mayo' ends in 'yo' where y is a vowel-like character
    // Original: /[aeiouy]o$/i matches 'mayo' (y is in [aeiouy]) -> 'mayos'
    // Mutated: /[^aeiouy]o$/i does NOT match 'mayo' (y excluded from consonant set)
    //          AND the original vowel+o rule is gone
    //          So 'mayo' falls through to default -> 'mayos'
    // Result is the same in both cases!
    // 
    // BUT what about a word ending in 'yo' that would match the consonant+o+'es' rule?
    // In original: caught by vowel+o rule first -> 's'
    // In mutated: NOT caught by consonant+o rule (y excluded) -> falls to default -> 's'
    // Still same!
    //
    // The REAL difference must be with words ending in consonant+o where
    // the duplicate rule in mutated changes priority...
    // No wait, 'es' rule still wins.
    //
    // I think I need to accept this might be equivalent and look for
    // a word where the vowel+o rule fires in original but in mutated
    // the word matches a DIFFERENT rule that gives a different result.
    //
    // What word ending in vowel+o could match another rule?
    // Words ending in 'eo': 'cameo', 'stereo', 'video'
    // Words ending in 'io': 'radio', 'studio', 'ratio'  
    // Words ending in 'oo': 'zoo', 'taboo'
    // Words ending in 'ao': rare
    // Words ending in 'uo': 'duo'
    // Words ending in 'yo': 'mayo', 'embryo'
    //
    // None of these seem to match other rules...
    // 
    // WAIT. What about the /x$|ch$|s$/i rule? 'chaos' ends in 's'!
    // But 'chaos' doesn't end in vowel+o.
    //
    // What about 'cameo'? Does it match /[^aeiou]y$|quy$/i? No.
    // Does it match /x$|ch$|s$/i? No.
    // Does it match any Latin/Greek rule? No.
    // Does it match /(fe?$)/i? No.
    // It would just fall to default.
    //
    // I'm going to test 'embryo' which ends in 'yo'
    // In original: y is in [aeiouy], matches vowel+o rule -> 'embryos'
    // In mutated: y is NOT in [^aeiouy], doesn't match -> falls to default -> 'embryos'
    // Same result.
    expect(plural('mayo')).toBe('mayos')
  })
})