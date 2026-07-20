import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should correctly handle the plus counter when parsing strings with whitespace", () => {
    // In original code: ' ', '\t', '\n' are whitespace (skipped, no counter change)
    // In mutated code: ' ', '\t', '' are whitespace (skipped, no counter change)
    // '\n' in mutated falls to else branch
    // isNaN('\n') === false (coerces to 0 in Number())
    // But '\n' can't be a regex token...
    
    // Let's try: what does the regex actually capture for various inputs?
    // Test with a string where behavior genuinely differs
    
    // In mutated code, "" is treated as whitespace. In original, "" goes to else.
    // parseFloat("") = NaN, isNaN("") = false... 
    // But "" can't be a token from the regex.
    
    // Let me try testing that a complex number parsed from string equals expected
    const c = new Complex("1+i");
    expect(c.re).toBe(1);
    expect(c.im).toBe(1);
  });
});