import { Complex } from "./complex.js";

describe("Complex.acsch", () => {
  it("should correctly compute the inverse hyperbolic cosecant for a complex number with non-zero imaginary part", () => {
    const c = new Complex(1, 1);
    const result = c.acsch();
    // The mutation changes the denominator calculation from a*a + b*b to a*a - b*b
    // For input (1, 1), the correct denominator should be 1*1 + 1*1 = 2
    // The mutated version would compute 1*1 - 1*1 = 0, leading to division by zero
    // This should produce Infinity in the real part for the mutated version
    expect(result.re).not.toBe(Infinity);
    // Additional check to ensure we get a finite result
    expect(Number.isFinite(result.re)).toBe(true);
    expect(Number.isFinite(result.im)).toBe(true);
  });
});