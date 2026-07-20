import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural', () => {
  it('should only apply quy rule to words ending with quy, not words containing quy mid-word', () => {
    // "soliloquys" contains "quy" but ends in "s"
    // Original: quy$ doesn't match "soliloquys"; s$ matches -> "soliloquyses"  
    // Mutated: quy matches "soliloquys" -> "soliloquyies" (substr removes last char 's', adds 'ies')
    // Actually need to check rule priority...
    // The quy rule is added before s$ rule, so with unshift, s$ rule ends up at lower index (higher priority)
    // Let me use a word ending in quy to verify correct behavior
    // "soliloquy" -> should be "soliloquies"
    // With original: quy$ matches -> "soliloquies" ✓
    // With mutated: quy matches -> "soliloquies" ✓ (same result, not useful)
    
    // Need word where quy appears NOT at end
    // "quyer" - contains quy, ends in 'r', no other rules match
    // Original: no match -> "quyers"
    // Mutated: quy matches -> "quyer".substr(0,4) + "ies" = "quyeies"  
    const result = plural('quyer');
    expect(result).toBe('quyers');
  });
});