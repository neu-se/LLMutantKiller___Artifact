import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex multiplication with negative zero", () => {
  it("should return real result with positive zero imaginary part when multiplying real numbers with -0 imaginary parts", () => {
    const a = new Complex(3, -0);
    const b = new Complex(4, -0);
    const result = a.mul(b);
    // Original: returns new Complex(3*4, 0) => im is +0
    // Mutated: re = 3*4 - (-0)*(-0) = 12 - 0 = 12, im = 3*(-0) + (-0)*4 = -0 + -0 = -0
    expect(Object.is(result.im, 0)).toBe(true);
  });
});