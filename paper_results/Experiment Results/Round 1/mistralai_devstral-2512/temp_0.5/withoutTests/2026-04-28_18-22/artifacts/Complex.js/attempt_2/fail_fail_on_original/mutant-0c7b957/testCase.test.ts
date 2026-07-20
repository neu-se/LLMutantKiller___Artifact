import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute atanh for a complex number with non-zero imaginary part", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    // Expected result calculated using the correct formula
    const expectedRe = 0.5 * Math.log((1 + 0.5) / (1 - 0.5)) - 0.25 * Math.atan2(1, 0.5);
    const expectedIm = 0.25 * Math.log((1 + 0.5) / (1 - 0.5)) + 0.5 * Math.atan2(1, 0.5);
    expect(Math.abs(result.re - expectedRe)).toBeLessThan(1e-10);
    expect(Math.abs(result.im - expectedIm)).toBeLessThan(1e-10);
  });
});