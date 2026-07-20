import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural', () => {
  it('should pluralize words ending in a vowel+o like "stereo" by adding s, not es', () => {
    // 'stereo' ends in 'eo' (vowel 'e' before 'o')
    // Original: /[aeiouy]o$/i matches first -> returns 'stereo' + 's' = 'stereos'
    // Mutant: /[^aeiouy]o$/i (duplicate of next rule) does NOT match 'stereo'
    //         falls through all rules -> default appends 's' = 'stereos'
    // Both give 'stereos'... 
    
    // Let's think about 'yo' ending words - 'y' is in [aeiouy]
    // 'embryo' ends in 'yo' (y is in [aeiouy])
    // Original: /[aeiouy]o$/i matches -> 'embryos'
    // Mutant: /[^aeiouy]o$/i does NOT match 'embryo' (y is NOT in [^aeiouy])
    //         next rule /[^aeiouy]o$/i also doesn't match -> default 's' = 'embryos'
    // Same result again...
    
    // The real difference: words ending in consonant+o
    // In original code order (rules are unshifted, so last added = first checked):
    // The stereo rule /[aeiouy]o$/ is added BEFORE /[^aeiouy]o$/
    // So rules array order (index 0 = most recently added):
    // ... /[^aeiouy]o$/ ... /[aeiouy]o$/ ...
    // Wait, unshift means last addRule call is at index 0
    // So /[aeiouy]o$/ is added first, then /[^aeiouy]o$/ is added (unshifted to front)
    // Order in array: /[^aeiouy]o$/ comes BEFORE /[aeiouy]o$/
    // For 'tomato' (ends in 'to', consonant+o):
    // Original: /[^aeiouy]o$/ matches -> 'tomatoes' ✓
    // Mutant: first /[^aeiouy]o$/ (was [aeiouy]o$) matches 'tomato'? No, 't' is consonant, [^aeiouy] matches -> 'tomatoes'
    // Hmm same...
    
    // For 'video' (vowel+o):
    // Original: /[^aeiouy]o$/ doesn't match, /[aeiouy]o$/ matches -> 'videos'
    // Mutant: first /[^aeiouy]o$/ doesn't match 'video', second /[^aeiouy]o$/ also doesn't match -> default 'videos'
    // Same...
    
    // The mutation makes the first rule also /[^aeiouy]o$/
    // For words ending in consonant+o, the FIRST matching rule now returns w+'s' instead of w+'es'
    // 'tomato': original -> 'tomatoes', mutant -> 'tomatos'
    expect(plural('tomato')).toBe('tomatoes')
  })
})