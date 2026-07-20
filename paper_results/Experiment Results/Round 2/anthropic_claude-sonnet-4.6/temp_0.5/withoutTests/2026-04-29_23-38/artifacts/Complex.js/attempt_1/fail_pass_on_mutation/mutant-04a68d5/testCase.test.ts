import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asinh", () => {
  it("should correctly compute asinh of a complex number", () => {
    // asinh(1 + i) should produce a specific complex result
    // The mutation changes `var a = this['re']` to `var a = this[""]` (undefined)
    // which would cause incorrect computation in the asinh method
    const c = new Complex(1, 1);
    const result = c.asinh();
    
    // Expected: asinh(1+i) ≈ 1.0612750619050357 + 0.6662394324925153i
    const expectedRe = 1.0612750619050357;
    const expectedIm = 0.6662394324925153;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});