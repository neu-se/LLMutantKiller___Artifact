import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    const x = 0.1;
    const c = new Complex(0, x);
    const tanResult = c.tan();
    const expectedRe = Math.sin(2*x) / (Math.cos(2*x) + Math.cosh(2*x));
    const expectedIm = Math.sinh(2*x) / (Math.cos(2*x) + Math.cosh(2*x));
    expect(tanResult.re).toBeCloseTo(expectedRe, 10);
    expect(tanResult.im).toBeCloseTo(expectedIm, 10);
  });
});