import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should use the correct approximation for small values", () => {
    const z = new Complex(1e-10, 0);
    const result = z.cosh();
    // The original code uses 1-x approximation for |x| < 1e-9
    // The mutant uses the full formula for |x| >= 1e-9
    // For x=1e-10, both should use the approximation, but we test the boundary
    expect(result.re).toBeCloseTo(1 - 1e-10, 15);
  });
});