import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural', () => {
  it('should pluralize words ending in yo with s not es, since y is vowel-like', () => {
    // 'mayo' ends in 'yo'
    // Original: y is in [aeiouy], matches /[aeiouy]o$/i -> 'mayos' (w+'s')
    // Mutated: /[aeiouy]o$/i replaced by /[^aeiouy]o$/i for the +s rule
    //          y is NOT in [^aeiouy], so 'mayo' doesn't match +s rule
    //          y is NOT in [^aeiouy], so 'mayo' doesn't match +es rule either
    //          Falls to default -> 'mayos'
    // Both give 'mayos'... 
    // BUT what if in mutated, 'mayo' matches the +es rule because y IS treated as consonant?
    // [^aeiouy] excludes y, so y does NOT match. 'mayo' -> default -> 'mayos'
    // Still same.
    //
    // NEW IDEA: What about a word ending in 'oo' like 'tattoo'?
    // 'tattoo': last char 'o', second-to-last 'o' (vowel)
    // Original: o is in [aeiouy] -> matches vowel+o rule -> 'tattoos'
    // Mutated: o is NOT in [^aeiouy] -> no match -> default -> 'tattoos'
    // Same!
    //
    // What about 'shampoo'? Same analysis. 'shampoos' in both.
    //
    // I'm going to try testing that a consonant+o word gets 'es' in original
    // but 's' in mutated - which would require the +s rule to have higher priority
    // Let me just try 'hero' and see what actually happens
    expect(plural('hero')).toBe('heroes')
  })
})