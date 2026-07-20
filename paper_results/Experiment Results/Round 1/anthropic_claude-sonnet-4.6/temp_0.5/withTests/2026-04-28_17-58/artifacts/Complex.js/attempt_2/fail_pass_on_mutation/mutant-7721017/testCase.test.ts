import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow with imaginary base", () => {
  it("should compute (0+1i)^1 = i, not zero", () => {
    // Base: i (re=0, im=1), Exponent: 1 (re=1, im=0)
    // Mutated: a===0 && true && z['re']>0 && z['im']>=0 => returns ZERO incorrectly
    // Original: a===0 && b===0 fails since b=1, so proceeds to compute correctly
    const base = new Complex(0, 1); // i
    const result = base.pow(new Complex(1, 0)); // i^1 = i
    
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(1, 10);
  });
});