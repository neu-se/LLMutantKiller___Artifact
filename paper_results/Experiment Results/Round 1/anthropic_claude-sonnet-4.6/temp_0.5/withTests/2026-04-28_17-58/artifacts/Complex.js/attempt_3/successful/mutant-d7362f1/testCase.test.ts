import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex multiplication with NaN real part", () => {
  it("should have imaginary part of 0 when multiplying NaN+0i by a real number", () => {
    // Original fast path (both im===0): returns new Complex(NaN * 5, 0) -> im is 0
    // Mutated skips fast path, uses general formula:
    //   re = NaN*5 - 0*0 = NaN
    //   im = NaN*0 + 0*5 = NaN  <-- differs from original!
    const a = new Complex(NaN, 0);
    const b = new Complex(5, 0);
    const result = a.mul(b);

    // In original: im === 0 (fast path used)
    // In mutated: im === NaN (general formula used)
    expect(isNaN(result.im)).toBe(false);
    expect(result.im).toBe(0);
  });
});