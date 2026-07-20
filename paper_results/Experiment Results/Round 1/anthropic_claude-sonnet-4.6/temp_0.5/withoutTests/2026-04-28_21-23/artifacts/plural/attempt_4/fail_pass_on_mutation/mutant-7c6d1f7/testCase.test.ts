import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural', () => {
  it('should correctly pluralize a word ending in consonant+o by adding es not s', () => {
    // In the mutated code, there are two rules for /[^aeiouy]o$/i
    // The first added (lower priority) returns w+'s'
    // The second added (higher priority) returns w+'es'  
    // But wait - are these priorities correct after ALL subsequent addRule calls?
    // After the o-rules, many more rules are added via unshift
    // These push the o-rules further back in the array
    // The RELATIVE order of the two o-rules stays the same
    // So consonant+o+'es' still beats consonant+o+'s'
    // Result: 'tomato' -> 'tomatoes' in both. Same.
    // 
    // I need to find a word where the ABSENCE of /[aeiouy]o$/i matters
    // The only case: a vowel+o word that in mutated matches a DIFFERENT rule
    // giving a different result than 's'
    //
    // 'cameo' in mutated: no vowel+o rule, no other rule matches -> default 's' -> 'cameos'
    // 'cameo' in original: vowel+o rule -> 's' -> 'cameos'  
    // Same!
    //
    // I'm going to test that 'potato' gets 'potatoes' not 'potatos'
    expect(plural('potato')).toBe('potatoes')
  })
})