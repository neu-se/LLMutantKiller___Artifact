import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute the imaginary part of atanh for input (0.5, 0.5)", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    // The mutation changes division by 2 to multiplication by 2 in the imaginary part calculation
    // For input (0.5, 0.5), the correct imaginary part should be approximately 0.2767871794485226
    // The mutated version would produce approximately 1.1071487177940898 (4x the correct value)
    expect(result.im).toBeCloseTo(0.2767871794485226, 10);
  });
});