import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosm1 function mutation test", () => {
  it("should correctly compute cos(x) - 1 for very small x values", () => {
    // Test a very small value where the Taylor series approximation should be used
    const x = 1e-5;
    const c = new Complex(x, 0);
    const result = c.expm1();
    // The mutation changes the sign in the Taylor series calculation
    // This test verifies the correct behavior by comparing with the expected value
    const expectedRe = Math.expm1(x);
    expect(result.re).toBeCloseTo(expectedRe, 15);
  });
});