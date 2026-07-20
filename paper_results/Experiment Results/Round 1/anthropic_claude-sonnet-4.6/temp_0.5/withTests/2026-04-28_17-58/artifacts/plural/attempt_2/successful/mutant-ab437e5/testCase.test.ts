import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural consonant+y rule', () => {
  it('should only apply ies transformation when word ends with consonant+y, not when y appears mid-word', () => {
    // "daily" ends in consonant+y... no that should get ies
    // "buyer" contains 'uy' (consonant+y) but y is not at end
    // With mutation /[^aeiou]y|quy$/i, "buyer" matches because 'b','u','y' - wait 'u' is vowel
    // "style" - 't','y' consonant+y, y not at end -> mutated gives "stie" + "ies" = "sties"? no
    // "style": substr(0, 4) + 'ies' = "styl" -> "styies"... 
    // Actually: "style".substr(0, 4) = "styl", + "ies" = "stylies"
    // Original: "style" ends in 'e', no match -> "styles"
    expect(plural('style')).toBe('styles');
  });
});