import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute atanh for a complex number with non-zero real and imaginary parts", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    const expectedRe = 0.255412811517784;
    const expectedIm = 0.6557942026326725;
    expect(Math.abs(result.re - expectedRe)).toBeLessThan(1e-10);
    expect(Math.abs(result.im - expectedIm)).toBeLessThan(1e-10);
  });
});