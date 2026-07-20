import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asinh", () => {
  it("should correctly compute asinh of a complex number", () => {
    // asinh(1 + i) should give a specific complex result
    const c = new Complex(1, 1);
    const result = c.asinh();
    
    // The expected value of asinh(1+i) is approximately 1.0612750619 + 0.6662394325i
    const expectedRe = 1.0612750619050357;
    const expectedIm = 0.6662394324925153;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});