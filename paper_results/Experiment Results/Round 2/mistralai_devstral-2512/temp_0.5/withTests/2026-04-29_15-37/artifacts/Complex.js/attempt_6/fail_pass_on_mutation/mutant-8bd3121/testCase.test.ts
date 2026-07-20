import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech()", () => {
  it("should produce correct results for complex numbers with non-zero imaginary part", () => {
    const z = new Complex(0.5, 0.5);
    const result = z.asech();
    // The mutation changes this['im'] to this[""] which will be undefined
    // This should cause the calculation to produce NaN or incorrect results
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
    // Verify the result is a valid complex number
    expect(result instanceof Complex).toBe(true);
  });
});