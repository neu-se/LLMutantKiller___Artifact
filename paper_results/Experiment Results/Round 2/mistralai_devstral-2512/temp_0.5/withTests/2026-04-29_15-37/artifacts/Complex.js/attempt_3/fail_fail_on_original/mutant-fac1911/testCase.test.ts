import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should handle non-zero imaginary part correctly in acsc calculation", () => {
    const c = new Complex(1, 1);
    const result = c.acsc();
    // The mutation changes a*a to a/a in the denominator calculation
    // For a=1, this would change 1*1=1 to 1/1=1 (same result)
    // For a=2, this would change 4 to 1 (different result)
    const c2 = new Complex(2, 1);
    const result2 = c2.acsc();
    expect(result2.re).toBeCloseTo(0.1946, 4);
    expect(result2.im).toBeCloseTo(-0.3272, 4);
  });
});