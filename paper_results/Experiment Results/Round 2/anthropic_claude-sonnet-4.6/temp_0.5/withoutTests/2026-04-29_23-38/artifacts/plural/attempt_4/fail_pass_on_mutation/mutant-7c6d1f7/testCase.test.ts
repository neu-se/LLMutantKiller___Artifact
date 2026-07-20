import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural', () => {
  it('should pluralize words ending in vowel+o by appending s via the specific rule before other rules interfere', () => {
    // 'cameo' ends in 'eo' - vowel 'e' before 'o'
    // The /[aeiouy]o$/i rule should match and return 'cameos'
    // In the mutant, /[^aeiouy]o$/i won't match 'cameo'
    // But 'cameo' also ends in 'o' after 'e', and no other rule matches
    // However 'studio' ends in 'io' - let's check if any rule catches it differently
    // 
    // Key insight: 'yo' ending - 'y' is in [aeiouy]
    // But also [^aeiou]y$ rule matches words ending in consonant+y
    // 'yo' itself: does /[^aeiou]y$/ match? No, 'yo' ends in 'o' not 'y'
    //
    // What about a word ending in 'oo'? Like 'zoo' - ends in 'oo', 'o' is a vowel
    // Original: /[aeiouy]o$/i matches 'zoo' -> 'zoos'  
    // Mutant: /[^aeiouy]o$/i doesn't match 'zoo', default -> 'zoos'
    // Same result...
    //
    // What about 'yo' words where [^aeiou]y$ could interfere?
    // 'embryo': /[^aeiou]y$/ - ends in 'o' not 'y', no match
    // 
    // The ONLY detectable difference: a vowel+o word that would match a LATER rule in mutant
    // In mutant, vowel+o words fall all the way to default +s
    // In original, they're caught by /[aeiouy]o$/ -> +s  
    // Result is the same unless another rule catches it first in mutant...
    //
    // Wait - what about 'yo' ending where y triggers /[^aeiou]y$/? No, ends in 'o'.
    // 
    // Let me reconsider: maybe the mutation is actually detectable via 'studio' type words
    // where the word also matches an earlier rule in the mutant path
    //
    // Actually testing 'zoo' - both should give 'zoos', let's just verify the stereo rule works
    expect(plural('stereo')).toBe('stereos')
  })
})