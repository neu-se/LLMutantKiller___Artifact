import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values in the Taylor series range", () => {
    // Test with a value in the Taylor series range (-π/4 ≤ x ≤ π/4)
    const x = 0.1;
    const c = new Complex(0, x);
    const result = c.expm1();
    // The real part uses cosm1(x) which should be very close to cos(x)-1
    // With the mutation (multiplication instead of division), the result will be orders of magnitude different
    const expectedCosm1 = Math.cos(x) - 1;
    const actualCosm1 = result.re - Math.expm1(0) * Math.cos(x);
    expect(actualCosm1).toBeCloseTo(expectedCosm1, 8);
    // Additional check that the value is reasonable (mutation would make this fail)
    expect(Math.abs(actualCosm1)).toBeLessThan(0.01);
  });
});