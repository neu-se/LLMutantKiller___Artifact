import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    // Test with a small value where the Taylor series approximation should be used
    const x = 0.001;
    const c = new Complex(0, x);
    const expm1 = c.expm1();
    const result = expm1.re;
    const expected = Math.expm1(0) * Math.cos(x) + (Math.cos(x) - 1);
    expect(result).toBeCloseTo(expected, 15);
  });
});