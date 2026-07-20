import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural', () => {
  it('words ending in yo should get s appended, not es', () => {
    // In original: 'yo' ending matches /[aeiouy]o$/i (y is in the set) -> w+'s'
    // In mutated: 'yo' ending does NOT match /[^aeiouy]o$/i (y excluded)
    //             AND does NOT match the 'es' consonant+o rule
    //             Falls to default -> w+'s'
    // Both give 's'... still equivalent
    // 
    // BUT: what if 'yo' ending word matches the /[^aeiou]y$/ rule somehow?
    // No - that requires ending in 'y' not 'yo'
    //
    // What if the word 'mayo' is in the tools/clothes/etc list? No.
    //
    // I truly cannot find a difference. Let me try testing the actual
    // behavior difference: in mutated, consonant+o words might get 's' 
    // if somehow the 's' rule has higher priority...
    // 
    // Actually wait - what if I'm wrong and 's' rule IS higher priority in mutated?
    // Let me reconsider: in mutated, line A adds 's' rule, line B adds 'es' rule.
    // Line B is called AFTER line A. unshift puts line B's rule at index 0.
    // So 'es' rule = index 0 = higher priority. I was right.
    //
    // Unless the subsequent addRule calls somehow interleave these...
    // No, they just push both further back maintaining relative order.
    expect(plural('embryo')).toBe('embryos')
  })
})