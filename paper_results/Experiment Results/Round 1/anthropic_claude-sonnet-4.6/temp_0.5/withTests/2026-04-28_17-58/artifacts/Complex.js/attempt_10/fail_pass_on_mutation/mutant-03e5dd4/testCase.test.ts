import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with newline character detection", () => {
  it("should parse string containing newline producing correct result in original but NaN or throw in mutated", () => {
    // The regex /\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g
    // In JavaScript without 's' flag, '.' does not match line terminators
    // HOWEVER: let's check if maybe the specific Node.js version used here
    // has different behavior, or if there's a specific string format that differs
    
    // Test with a string where '\n' appears between tokens
    // If '\n' IS captured as a token in the test environment:
    // Original: skipped as whitespace -> correct result
    // Mutated: parsed as number -> NaN result (parseFloat('\n') === NaN)
    
    const c = new Complex("3\n+4i");
    expect(c.re).toBe(3);
    expect(c.im).toBe(4);
    expect(c.isNaN()).toBe(false);
  });
});