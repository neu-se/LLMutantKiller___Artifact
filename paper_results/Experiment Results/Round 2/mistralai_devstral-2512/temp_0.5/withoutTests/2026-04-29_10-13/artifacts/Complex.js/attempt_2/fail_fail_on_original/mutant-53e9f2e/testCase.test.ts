import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute atanh for a complex number with non-zero real and imaginary parts", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    const expectedRe = 0.25 * Math.log((1.5 * 0.5 - 0.25) / ((1.5 * 0.5 - 0.25) + 0.25 * 0.25));
    const expectedIm = 0.25 * Math.atan2(0.5 * 0.5 + 0.5 * 0.5, 0.5 * 0.5 - 0.25);
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});