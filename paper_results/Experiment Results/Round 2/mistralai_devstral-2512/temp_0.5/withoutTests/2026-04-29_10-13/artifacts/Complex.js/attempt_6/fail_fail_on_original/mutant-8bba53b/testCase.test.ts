import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values in expm1", () => {
    // Test with a small value where the Taylor series approximation is used
    const x = 0.01;
    const c = new Complex(x, 0);
    const expm1 = c.expm1();
    // For small x, expm1 should be approximately x + x^2/2 + x^3/6
    const expected = Math.expm1(x) * Math.cos(0) + (Math.cos(x) - 1);
    expect(expm1.re).toBeCloseTo(expected, 10);
  });
});