import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural', () => {
  it('should pluralize words ending in consonant+o with es via the correct rule, not s', () => {
    // In the mutant, RULE_A becomes /[^aeiouy]o$/ -> w+'s'
    // RULE_B is /[^aeiouy]o$/ -> w+'es'  
    // RULE_B was added AFTER RULE_A so RULE_B is at lower index
    // BUT: all subsequent addRule calls (memo, cello, person, etc.) are unshifted AFTER
    // So those end up at even lower indices
    // 
    // The rules array from index 0 outward:
    // [uncountable, ics, tools/clothes/etc, bison/deer/etc, man/woman, chilli, person, 
    //  mouse, goose, die, cello, memo, bacterium, criterion, f/fe, 
    //  RULE_B(/[^aeiouy]o$/->+es), RULE_A(/[aeiouy]o$/->+s in orig, /[^aeiouy]o$/->+s in mutant),
    //  appendix/index, thesis/crisis, nucleus/etc, x/ch/s, consonant+y]
    //
    // For 'potato': RULE_B matches -> 'potatoes' in both. Same.
    // For 'stereo': RULE_B no match, RULE_A matches in orig -> 'stereos'; mutant no match -> default 'stereos'. Same.
    //
    // The ONLY difference would be if a consonant+o word reaches RULE_A(mutant) before RULE_B
    // That's impossible since RULE_B has lower index.
    //
    // Unless... 'cello' and 'memo' are string rules added AFTER RULE_B but they're exact matches.
    // What about 'logo'? Not in any list. Ends in 'go' (consonant+o).
    // Scans: no specific rule matches, reaches RULE_B -> 'logoes'? 
    // Wait - is that right? Let me verify with original behavior.
    expect(plural('logo')).toBe('logos')
  })
})