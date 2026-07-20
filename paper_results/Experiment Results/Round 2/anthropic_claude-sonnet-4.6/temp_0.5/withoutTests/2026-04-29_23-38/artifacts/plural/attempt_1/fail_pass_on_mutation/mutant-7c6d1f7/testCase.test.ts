import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural', () => {
  it('should pluralize words ending in a vowel followed by o (like stereo) by adding s', () => {
    // Words ending in vowel + o (matching /[aeiouy]o$/) should get 's' appended
    // In original: /[aeiouy]o$/i matches 'stereo' -> 'stereos'
    // In mutant: /[^aeiouy]o$/i (same as the rule below) would NOT match 'stereo'
    // and 'stereo' would fall through to the next rule /[^aeiouy]o$/ which also doesn't match
    // so it would get 's' appended by the default rule anyway... let's check 'video'
    // 'video' ends in 'eo' - vowel before 'o'
    // Original: /[aeiouy]o$/i matches -> 'videos'
    // Mutant: /[^aeiouy]o$/i does NOT match 'video', falls through to next /[^aeiouy]o$/ which also doesn't match
    // so default 's' is appended -> 'videos' (same result)
    
    // Let's think about 'cameo' - ends in 'eo'
    // Original: first /[aeiouy]o$/ matches -> 'cameos'
    // Mutant: /[^aeiouy]o$/ doesn't match 'cameo', next /[^aeiouy]o$/ also doesn't match -> default 'cameos'
    
    // The key difference: in the mutant, the rule /[^aeiouy]o$/i appears TWICE
    // Words ending in consonant+o would match the FIRST duplicate rule (returning w+'s')
    // instead of the second rule (returning w+'es')
    // e.g., 'hero' ends in 'ro' (consonant+o)
    // Original: /[aeiouy]o$/ doesn't match, /[^aeiouy]o$/ matches -> 'heroes'
    // Mutant: /[^aeiouy]o$/ (first rule, was for vowel+o) matches -> 'heros' (wrong!)
    
    expect(plural('hero')).toBe('heroes')
  })
})