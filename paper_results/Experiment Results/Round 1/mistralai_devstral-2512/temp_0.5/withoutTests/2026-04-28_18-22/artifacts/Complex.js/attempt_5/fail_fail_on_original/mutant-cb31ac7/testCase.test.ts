import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    const x = 0.1;
    const c = new Complex(x, 0);
    const expm1 = c.expm1();
    const expectedRe = Math.expm1(x) * Math.cos(0) + (Math.cos(x) - 1);
    expect(expm1.re).toBeCloseTo(expectedRe, 10);
  });
});