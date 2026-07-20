import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosm1 function mutation", () => {
  it("should correctly compute cos(x) - 1 for small x values in expm1", () => {
    const x = 0.1;
    const c = new Complex(0, x);
    const result = c.expm1();
    // The real part of exp(i*x)-1 should be cos(x)-1
    // This directly tests the cosm1 function which uses the Taylor series
    const expectedReal = Math.cos(x) - 1;
    expect(result.re).toBeCloseTo(expectedReal, 12);
  });
});