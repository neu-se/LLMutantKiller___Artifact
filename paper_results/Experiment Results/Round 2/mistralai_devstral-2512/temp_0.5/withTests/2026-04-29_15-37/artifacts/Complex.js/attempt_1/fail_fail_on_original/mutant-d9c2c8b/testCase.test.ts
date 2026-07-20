import { Complex } from "./complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute the imaginary part of atanh for a specific input", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    // The mutation changes the division by 2 to multiplication by 2 in the imaginary part calculation
    // For input (0.5, 0.5), the correct imaginary part should be approximately 0.5 * atan2(...)
    // The mutated version would produce 2 * atan2(...), which is 4x the correct value
    expect(result.im).toBeCloseTo(0.5 * Math.atan2(0.5, 0.5) / 2, 10);
  });
});