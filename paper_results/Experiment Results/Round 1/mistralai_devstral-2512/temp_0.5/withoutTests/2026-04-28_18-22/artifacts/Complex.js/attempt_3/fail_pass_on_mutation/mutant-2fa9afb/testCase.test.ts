import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sinh", () => {
  it("should handle the special case of (0, 0) correctly", () => {
    const zero = new Complex(0, 0);
    const result = zero.sinh();
    // The original code has special handling for (0, 0) that returns (0, 0)
    // The mutated code changes the condition to always true, which would execute the special case
    // for all inputs, causing incorrect results for non-zero inputs
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
  });
});