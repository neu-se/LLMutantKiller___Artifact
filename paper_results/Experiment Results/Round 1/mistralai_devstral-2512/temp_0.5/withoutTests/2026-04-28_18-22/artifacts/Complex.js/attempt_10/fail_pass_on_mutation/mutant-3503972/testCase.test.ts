import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should handle division by zero correctly when both real and imaginary parts are zero", () => {
    const c = new Complex(0, 0);
    const result = c.acsch();
    // For (0,0) input, d = 0, so it should take the second branch
    // Original: (b !== 0) ? -b/0 : 0 = 0 (since b=0)
    // Mutated: (b !== 0) ? +b/0 : 0 = 0 (since b=0)
    // Both should return the same result for this case
    expect(result.im).toBe(0);
  });
});