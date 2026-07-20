import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for very small x values", () => {
    // Test with a very small value where the Taylor series is used
    const x = 0.001;
    const c = new Complex(0, x);
    const result = c.expm1();
    // For very small x, cosm1(x) ≈ -x²/2
    // The mutation (multiplication instead of division) would make this term extremely large
    const expectedReal = Math.expm1(0) * Math.cos(x) + (Math.cos(x) - 1);
    expect(result.re).toBeCloseTo(expectedReal, 10);
    // The mutation would cause the real part to be way off
    expect(Math.abs(result.re)).toBeLessThan(0.001);
  });
});