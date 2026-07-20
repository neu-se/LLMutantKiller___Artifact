import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asinh", () => {
  it("should return correct real part for asinh of a real number", () => {
    // asinh(2) = ln(2 + sqrt(5)) ≈ 1.4436354751788103
    // The mutation corrupts this['re'] before asin() is called
    // For a real input (im=0), tmp=0, this['im']=-2, then:
    // original: this['re'] = 0
    // mutated: this['re'] = NaN
    // This makes asin() receive (NaN, -2) instead of (0, -2)
    const c = new Complex(2, 0);
    const result = c.asinh();
    
    expect(result.re).toBeCloseTo(1.4436354751788103, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});