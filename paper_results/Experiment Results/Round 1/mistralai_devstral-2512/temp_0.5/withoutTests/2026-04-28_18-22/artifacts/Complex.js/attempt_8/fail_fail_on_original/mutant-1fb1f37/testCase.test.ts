import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should use Taylor approximation for small values in cosh", () => {
    // Test with a value that should trigger the Taylor approximation
    const z = new Complex(1e-10, 0);
    const result = z.cosh();
    // The original code uses 1 - x for small x (|x| < 1e-9)
    // The mutated code always uses the full formula
    // We test that the result is exactly 1 - x (within floating point precision)
    expect(result.re).toBe(1 - 1e-10);
  });
});