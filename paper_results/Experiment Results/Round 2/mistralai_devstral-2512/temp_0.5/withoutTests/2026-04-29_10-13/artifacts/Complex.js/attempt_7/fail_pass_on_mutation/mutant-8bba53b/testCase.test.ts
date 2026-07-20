import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small imaginary values", () => {
    // Test with a small imaginary value where cosm1 is used
    const x = 0.001;
    const c = new Complex(0, x);
    const expm1 = c.expm1();
    // For small imaginary x, expm1 should be approximately (cos(x)-1) + i*sin(x)
    const expectedRe = Math.cos(x) - 1;
    expect(expm1.re).toBeCloseTo(expectedRe, 10);
  });
});