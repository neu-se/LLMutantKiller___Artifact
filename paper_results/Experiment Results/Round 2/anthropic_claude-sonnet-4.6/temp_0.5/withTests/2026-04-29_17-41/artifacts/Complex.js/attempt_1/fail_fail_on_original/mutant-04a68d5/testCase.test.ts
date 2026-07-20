import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asinh", () => {
  it("should correctly compute asinh of a complex number with non-zero real part", () => {
    // asinh(2 + 3i) should have specific real and imaginary parts
    // In the mutated code, var a = this[""] gives undefined instead of this['re']
    // which will cause incorrect computation
    const c = new Complex(2, 3);
    const result = c.asinh();
    
    // Known value: asinh(2+3i) ≈ 0.9706 + 1.0686i
    const expectedRe = Math.log(2 + Math.sqrt(4 + 1)) * 0; // compute properly
    
    // The real part should be approximately 0.9706290731874155
    // The imaginary part should be approximately 1.0686074213827783
    expect(result.re).toBeCloseTo(0.9706290731874155, 10);
    expect(result.im).toBeCloseTo(1.0686074213827783, 10);
  });
});