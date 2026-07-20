import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosm1 function", () => {
  it("should correctly compute expm1 for purely imaginary numbers", () => {
    // Test with a purely imaginary number where cosm1 is used
    const x = new Complex(0, 0.1);
    const result = x.expm1();
    const expectedRe = Math.expm1(0) * Math.cos(0.1) + (Math.cos(0.1) - 1);
    const expectedIm = Math.exp(0) * Math.sin(0.1);
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});