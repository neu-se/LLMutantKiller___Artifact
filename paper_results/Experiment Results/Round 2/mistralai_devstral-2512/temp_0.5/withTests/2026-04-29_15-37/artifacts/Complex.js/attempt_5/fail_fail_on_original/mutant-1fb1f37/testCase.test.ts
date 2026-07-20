import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should correctly compute cosh for very small values", () => {
    const z = new Complex(1e-10, 0);
    const result = z.cosh();
    // The original implementation uses 1 - x for small x (Taylor series)
    // The mutated implementation always uses the full formula
    // For x = 1e-10, the Taylor approximation should give us 1 - 1e-10
    // while the full formula gives us 1 (within floating point precision)
    expect(result.re).toBeCloseTo(1 - 1e-10, 15);
    expect(result.im).toBe(0);
  });
});