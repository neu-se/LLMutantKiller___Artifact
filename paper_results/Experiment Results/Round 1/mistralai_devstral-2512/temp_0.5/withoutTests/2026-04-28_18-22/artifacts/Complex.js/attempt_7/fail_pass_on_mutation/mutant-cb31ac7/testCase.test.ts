import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    const x = 0.1;
    const c = new Complex(0, x);
    const cosResult = c.cos();
    const expectedRe = Math.cos(0) * Math.cosh(x);
    expect(cosResult.re).toBeCloseTo(expectedRe, 10);
  });
});