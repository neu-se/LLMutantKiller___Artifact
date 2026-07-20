import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute atanh for a complex number with non-zero real and imaginary parts", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    // The mutation changes division by 2 to multiplication by 2 in the imaginary part calculation
    // For input (0.5, 0.5), the correct imaginary part should be approximately 0.5 * atan2(0.5, 0.5)
    // The mutated version would produce 2 * atan2(0.5, 0.5) which is 4x the correct value
    expect(result.im).toBeCloseTo(0.5 * Math.atan2(0.5, 0.5), 6);
  });
});