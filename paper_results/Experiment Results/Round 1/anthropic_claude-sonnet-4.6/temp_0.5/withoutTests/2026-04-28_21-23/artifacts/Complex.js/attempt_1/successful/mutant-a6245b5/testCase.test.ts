import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh edge case", () => {
  it("should return Infinity real part and 0 imaginary part for atanh(1)", () => {
    // When a=1, b=0: d = (1-1)^2 + 0^2 = 0, triggering the fallback branch
    // Original: im part = (b !== 0) ? (b/0) : 0 = 0
    // Mutated:  im part = (b === 0) ? (b/0) : 0 = NaN (since 0/0 = NaN)
    const result = new Complex(1, 0).atanh();
    
    // In original code, the imaginary part should be 0 (not NaN)
    expect(isNaN(result.im)).toBe(false);
    expect(result.im).toBe(0);
    // The real part should be Infinity
    expect(result.re).toBe(Infinity);
  });
});