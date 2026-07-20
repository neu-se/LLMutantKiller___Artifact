import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex tanh", () => {
  it("should correctly compute tanh of a complex number with nonzero imaginary part", () => {
    // tanh(z) uses sinh(2a) and cosh(2a) in denominator/numerator
    // For z = 1 + i: tanh(1+i) has known value
    const c = new Complex(1, 1);
    const result = c.tanh();
    // tanh(1+i) = (sinh(2) + i*sin(2)) / (cosh(2) + cos(2))
    const d = Math.cosh(2) + Math.cos(2);
    const expectedRe = Math.sinh(2) / d;
    const expectedIm = Math.sin(2) / d;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});