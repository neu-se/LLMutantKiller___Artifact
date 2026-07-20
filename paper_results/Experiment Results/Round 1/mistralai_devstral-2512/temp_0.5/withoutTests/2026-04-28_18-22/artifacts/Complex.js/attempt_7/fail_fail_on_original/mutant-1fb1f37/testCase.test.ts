import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should correctly handle the boundary case for cosh approximation", () => {
    // Test with a value just below the threshold (1e-9)
    const z = new Complex(0.999999999e-9, 0);
    const result = z.cosh();
    // The original code should use 1 - x for this value
    // The mutated code will use the full formula
    // We verify the result matches the Taylor approximation
    expect(result.re).toBeCloseTo(1 - 0.999999999e-9, 10);
  });
});