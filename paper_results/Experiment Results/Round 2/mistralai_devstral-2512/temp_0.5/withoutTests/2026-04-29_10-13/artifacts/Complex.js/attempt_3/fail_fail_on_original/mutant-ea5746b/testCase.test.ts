import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    // Test with a small value where the Taylor series approximation is used
    const x = 0.01;
    const c = new Complex(x, 0);
    const result = c.expm1();
    // The real part should be cosm1(x) which is cos(x) - 1
    // We'll compute the expected value directly for comparison
    const expectedCosm1 = Math.cos(x) - 1;
    expect(result.re).toBeCloseTo(expectedCosm1, 10);
  });
});