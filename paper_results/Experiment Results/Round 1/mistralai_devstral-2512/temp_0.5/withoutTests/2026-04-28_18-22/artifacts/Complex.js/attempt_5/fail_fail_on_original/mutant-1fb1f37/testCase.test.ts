import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should correctly compute cosh for very small values using Taylor approximation", () => {
    const z = new Complex(1e-10, 0);
    const result = z.cosh();
    // The original code uses 1 - x for small x (|x| < 1e-9)
    // The mutated code always uses the full formula (Math.exp(x) + Math.exp(-x)) * 0.5
    // For x = 1e-10, we expect the Taylor approximation result
    expect(result.re).toBeCloseTo(1 - 1e-10, 10);
  });
});