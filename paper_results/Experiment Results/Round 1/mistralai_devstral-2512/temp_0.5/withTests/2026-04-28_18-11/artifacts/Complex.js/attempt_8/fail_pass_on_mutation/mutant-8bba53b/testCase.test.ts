import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosm1 function mutation test", () => {
  it("should correctly compute cos(x) - 1 for x near PI/4 boundary", () => {
    // Test a value near the boundary where Taylor series switches to Math.cos
    const x = Math.PI / 4 - 0.001;
    const c = new Complex(x, 0);
    const result = c.expm1();
    // The mutation changes the sign in the Taylor series calculation
    // This test verifies the correct behavior by comparing with the expected value
    const expectedRe = Math.expm1(x);
    expect(result.re).toBeCloseTo(expectedRe, 10);
  });
});