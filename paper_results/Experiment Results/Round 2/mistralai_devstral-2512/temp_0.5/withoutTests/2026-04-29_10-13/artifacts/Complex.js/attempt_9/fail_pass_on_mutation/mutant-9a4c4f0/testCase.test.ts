import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute cos(x) for small x values using Taylor series", () => {
    const x = 0.1;
    const c = new Complex(x, 0);
    const result = c.cos();
    // For small x, cos(x) should be computed using the Taylor series
    // cos(x) ≈ 1 - x²/2 + x⁴/24 - x⁶/720 + x⁸/40320
    const expected = 1 - x*x/2 + x*x*x*x/24 - x*x*x*x*x*x/720 + x*x*x*x*x*x*x*x/40320;
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});