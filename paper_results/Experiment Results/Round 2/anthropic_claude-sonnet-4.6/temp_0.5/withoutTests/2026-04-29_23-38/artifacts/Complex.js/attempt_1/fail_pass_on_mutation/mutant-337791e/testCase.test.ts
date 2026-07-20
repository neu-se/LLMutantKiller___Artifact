import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex exp method", () => {
  it("should correctly compute exp of a complex number with non-zero imaginary part", () => {
    // exp(1 + 2i) = e^1 * (cos(2) + i*sin(2))
    const c = new Complex(1, 2);
    const result = c.exp();
    
    const expectedRe = Math.exp(1) * Math.cos(2);
    const expectedIm = Math.exp(1) * Math.sin(2);
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});