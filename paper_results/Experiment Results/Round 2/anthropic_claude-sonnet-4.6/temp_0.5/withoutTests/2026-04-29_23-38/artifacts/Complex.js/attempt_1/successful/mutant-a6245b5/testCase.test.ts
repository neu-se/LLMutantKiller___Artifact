import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh edge case", () => {
  it("should compute atanh(1) correctly without NaN in imaginary part", () => {
    // When a=1, b=0: d = (1-1)^2 + 0^2 = 0, so we hit the else branch
    // Original: (b !== 0) ? (b/0) : 0  => im = 0 (since b=0)
    // Mutated:  (b === 0) ? (b/0) : 0  => im = 0/0 = NaN (since b=0)
    const result = new Complex(1, 0).atanh();
    
    // The result should not have NaN in the imaginary part
    expect(isNaN(result.im)).toBe(false);
    // The real part should be Infinity (atanh(1) = +Infinity)
    expect(isFinite(result.re) || result.re === Infinity || result.re === -Infinity).toBe(true);
    expect(isNaN(result.re)).toBe(false);
  });
});