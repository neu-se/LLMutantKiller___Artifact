import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asinh", () => {
  it("should compute asinh correctly for a complex number with non-zero imaginary part", () => {
    // asinh(1 + i) should return a valid complex number
    // In the mutated code, res['re'] = -res[""] = -undefined = NaN
    const result = new Complex(1, 1).asinh();
    
    // The real part should be a finite number, not NaN
    expect(isNaN(result.re)).toBe(false);
    expect(isFinite(result.re)).toBe(true);
    
    // Known value: asinh(1+i) ≈ 1.0612750619 + 0.6662394325i
    expect(result.re).toBeCloseTo(1.0612750619050357, 10);
    expect(result.im).toBeCloseTo(0.6662394324925153, 10);
  });
});