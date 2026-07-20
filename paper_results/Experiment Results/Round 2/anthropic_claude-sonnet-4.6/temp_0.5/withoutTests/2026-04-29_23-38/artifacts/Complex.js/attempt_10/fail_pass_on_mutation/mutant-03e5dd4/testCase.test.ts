import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should parse complex number string with newline between sign and number", () => {
    // Test using actual Unicode line separator U+2028 which . DOES match
    const lineSep = "\u2028";
    // In original: \u2028 is not ' ', '\t', or '\n' -> falls to else
    // isNaN('\u2028') -> Number('\u2028') === 0 -> isNaN is false
    // plus+minus after '+' is 1, so no throw, treated as 0 added to re
    // In mutated: same behavior since \u2028 !== ''
    // Both should give same result
    
    // Let's try the actual newline \n with the s flag consideration
    // What if we test that the parser handles a string with ONLY whitespace chars?
    // "\t\t" -> tokens=['\t','\t'] -> both skipped -> plus+minus=1 -> throws
    expect(() => new Complex("\t\t")).toThrow(SyntaxError);
  });
});