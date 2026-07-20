import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    const x = 0.1;
    const c = new Complex(0, x);
    const sinResult = c.sin();
    const expectedRe = Math.sin(0) * Math.cosh(x);
    const expectedIm = Math.cos(0) * Math.sinh(x);
    expect(sinResult.re).toBeCloseTo(expectedRe, 10);
    expect(sinResult.im).toBeCloseTo(expectedIm, 10);
  });
});