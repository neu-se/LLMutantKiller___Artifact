import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should use the Taylor series approximation for small values", () => {
    const z = new Complex(1e-10, 0);
    const result = z.cosh();

    // The original implementation uses 1 - x for small x (Taylor series)
    // The mutated implementation always uses the full formula
    // For x = 1e-10, the Taylor approximation gives us 1 - 1e-10
    // while the full formula gives us 1 (within floating point precision)
    // We need to check the actual implementation behavior

    // Calculate what the Taylor approximation would give
    const taylorApprox = 1 - 1e-10;

    // The result should be closer to the Taylor approximation than to 1
    const diffToTaylor = Math.abs(result.re - taylorApprox);
    const diffToOne = Math.abs(result.re - 1);

    // The original implementation should be closer to the Taylor approximation
    expect(diffToTaylor).toBeLessThan(diffToOne);
  });
});