import { Complex } from "./complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute the imaginary part of atanh for a specific complex number", () => {
    const z = new Complex(0.5, 0.5);
    const result = z.atanh();
    // The mutation changes division by 2 to multiplication by 2 in the imaginary part calculation
    // For z = 0.5 + 0.5i, the correct imaginary part should be approximately 0.4408
    // With the mutation (multiplied by 2), it would be approximately 0.8816
    expect(result.im).toBeCloseTo(0.4408, 4);
  });
});