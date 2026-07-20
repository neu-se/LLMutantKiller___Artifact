import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow", () => {
  it("should compute (2+3i)^(1+1i) correctly with complex exponent", () => {
    // With complex exponent, goes straight to general formula
    // Original: checks if(a===0 && b===0) - false for a=2,b=3, continues
    // Mutated: if(true) returns ZERO
    const c = new Complex(2, 3);
    const result = c.pow(new Complex(1, 1));
    
    // Should not be zero
    expect(result.re).not.toBeCloseTo(0, 5);
  });
});