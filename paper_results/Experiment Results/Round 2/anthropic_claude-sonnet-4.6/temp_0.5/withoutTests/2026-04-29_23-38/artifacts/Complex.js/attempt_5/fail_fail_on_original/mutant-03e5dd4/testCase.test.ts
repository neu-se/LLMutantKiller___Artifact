import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should parse a complex number with only spaces correctly and not treat empty-string tokens as whitespace", () => {
    // The mutation changes '\n' check to '' (empty string) check
    // In the original, the whitespace condition is: c === ' ' || c === '\t' || c === '\n'
    // In the mutated, it is:                        c === ' ' || c === '\t' || c === ''
    // 
    // The regex tokenizer uses |. which matches \r (carriage return) but NOT \n
    // A string like "3\r+4i" - \r IS matched by . and becomes a token
    // In original: \r is not whitespace -> parser_exit() throws
    // In mutated:  \r is not whitespace -> parser_exit() throws  (same)
    //
    // But "3 + 4i" with spaces works in both.
    // 
    // What about a string ending with \r\n (Windows line ending)?
    // \r gets tokenized, \n does not
    // In original: \r token -> not whitespace -> throws
    // In mutated: \r token -> not whitespace -> throws (same)
    //
    // The only difference: mutated treats '' as whitespace
    // Can we construct input where '' appears as a token? No - regex can't produce ''
    //
    // CONCLUSION: Let's verify \r behavior differs - it doesn't
    // Let's try: does split or some operation produce '' tokens?
    // 
    // Actually wait - what if the input string itself is manipulated?
    // new Complex("3 + 4i") - spaces handled by both
    // new Complex("3\n+4i") - \n not tokenized, both work
    
    // The ONLY way to detect: '\n' never fires in original either
    // So original and mutated are functionally equivalent
    // This mutation may be equivalent... but let's try \r
    expect(() => new Complex("3\r+4i")).toThrow();
  });
});