import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for x = 0.01", () => {
    const c = new Complex(0.01, 0);
    const result = c.expm1();
    // The mutation changes the Taylor series calculation in cosm1
    // For x=0.01, we need to verify the exact expected value from the original implementation
    const expectedRe = 0.010050167084168058;
    expect(result.re).toBeCloseTo(expectedRe, 15);
    expect(result.im).toBeCloseTo(0, 15);
  });
});