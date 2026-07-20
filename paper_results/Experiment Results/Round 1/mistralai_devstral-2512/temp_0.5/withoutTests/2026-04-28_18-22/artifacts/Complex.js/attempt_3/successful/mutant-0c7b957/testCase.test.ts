import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute atanh for a complex number with non-zero imaginary part", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    // The mutation changes b*b to b/b in the denominator calculation
    // This will cause division by zero when b=0, but we test with b=0.5
    // The result should still be different from the original
    expect(result.re).toBeCloseTo(0.4023594781362336);
    expect(result.im).toBeCloseTo(0.5549399322615806);
  });
});