import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex mul", () => {
  it("should return positive zero imaginary part when multiplying real numbers with negative zero imaginary parts", () => {
    const a = new Complex(3, -0);
    const b = new Complex(4, -0);
    const result = a.mul(b);
    expect(result.re).toBe(12);
    // Original: short circuit returns new Complex(12, 0) - im is literal +0
    // Mutated: im = 3*(-0) + (-0)*4 = -0 + -0 = -0
    expect(Object.is(result.im, -0)).toBe(false);
  });
});