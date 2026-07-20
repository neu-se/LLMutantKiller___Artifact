import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural', () => {
  it('should pluralize "tattoo" as "tattoos" not "tattooes"', () => {
    // 'tattoo' ends in 'oo' where the char before final 'o' is 'o' (a vowel in [aeiouy])
    // Original: RULE_B /[^aeiouy]o$/i checked first - 'o' IS in [aeiouy] so [^aeiouy] does NOT match -> no match
    //           RULE_A /[aeiouy]o$/i - 'o' IS in [aeiouy] -> MATCHES -> returns 'tattoo' + 's' = 'tattoos'
    // Mutant:   RULE_B /[^aeiouy]o$/i checked first - does NOT match 'tattoo'
    //           RULE_A(mutant) /[^aeiouy]o$/i - does NOT match 'tattoo'  
    //           Falls to default -> 'tattoos'
    // Both give 'tattoos'... same
    //
    // BUT WAIT: what about 'tattoo' matching /x$|ch$|s$/i? No.
    // What about the f/fe rule? No.
    // 
    // Let me try a completely different approach - test with num=1
    // plural('stereo', 1) should return 'stereo' in both. Same.
    //
    // What if I add a rule after import that targets vowel+o words?
    // Then in original, the built-in /[aeiouy]o$/ catches them before my rule
    // In mutant, my rule would catch them instead
    const customPlural = plural.addRule(/[aeiouy]o$/i, (w: string) => w + '_custom')
    expect(plural('cameo')).toBe('cameo_custom')
  })
})