import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asinh", () => {
  it("should correctly compute asinh of a purely imaginary number", () => {
    // asinh(0 + 2i) - using a number where re=0 and im=2
    // In the mutation, this['re'] = -this[""] = -undefined = NaN
    // This corrupts the object before asin() is called, producing NaN result
    const c = new Complex(0, 2);
    const result = c.asinh();
    
    // asinh(2i) = i * asin(2) ≈ i * (π/2 + i*ln(2+√3)) = -ln(2+√3) + i*π/2
    // ≈ -1.3169578969248166 + 1.5707963267948966i
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
    expect(result.re).toBeCloseTo(-1.3169578969248166, 10);
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });
});