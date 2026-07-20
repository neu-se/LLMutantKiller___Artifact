import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex multiplication with real numbers", () => {
  it("should correctly multiply two real numbers using optimized path", () => {
    const a = new Complex(2.5, 0);
    const b = new Complex(4, 0);
    const result = a.mul(b);
    expect(result.re).toBe(10);
    expect(result.im).toBe(0);
    // Verify the result is exactly what we expect from the optimized path
    expect(result.re).toBeCloseTo(2.5 * 4);
    expect(result.im).toBeCloseTo(0);
  });
});