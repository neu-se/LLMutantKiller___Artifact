import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number expm1 function", () => {
  it("should correctly compute expm1 for small complex numbers", () => {
    const z = new Complex(0.1, 0.1);
    const result = z.expm1();
    const expectedRe = Math.expm1(0.1) * Math.cos(0.1) + (Math.cos(0.1) - 1);
    const expectedIm = Math.exp(0.1) * Math.sin(0.1);
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});