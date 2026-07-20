import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should handle the specific case that exposes the mutation", () => {
    const c = new Complex(0, 1);
    const result = c.acsc();
    // The mutation changes a*a to a/a in the denominator calculation
    // When a=0, this becomes 0/0 which is NaN
    // The original code should produce a valid result
    // The mutated code will produce NaN
    expect(result.re).toBe(0);
    expect(result.im).toBeGreaterThan(0);
  });
});