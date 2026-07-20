import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asinh", () => {
  it("should correctly compute asinh of a purely imaginary number", () => {
    // asinh(0 + 2i): in the mutated code, this['re'] = -this[""] = NaN
    // which corrupts the object before asin() is called, producing NaN result
    const c = new Complex(0, 2);
    const result = c.asinh();
    
    // The result should be a finite complex number, not NaN
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
    expect(result.re).toBeCloseTo(1.3169578969248166, 10);
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });
});