import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute the imaginary part of atanh for a specific complex number", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    // The expected value is based on the correct implementation
    // For atanh(0.5 + 0.5i), the imaginary part should be approximately 0.2546479089470325
    expect(result.im).toBeCloseTo(0.2546479089470325, 10);
  });
});