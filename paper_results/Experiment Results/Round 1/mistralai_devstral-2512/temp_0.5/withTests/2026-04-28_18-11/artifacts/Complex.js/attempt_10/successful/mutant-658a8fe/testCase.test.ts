import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should correctly handle non-zero d case by taking the proper branch", () => {
    // Create a complex number where d = a^2 + b^2 will definitely not be zero
    const c = new Complex(2, 3);
    const result = c.acsch();

    // The mutation would cause it to take the else branch when d !== 0
    // The else branch returns a Complex with Infinity components
    // So we verify the result is finite (not Infinity)
    expect(Number.isFinite(result.re)).toBe(true);
    expect(Number.isFinite(result.im)).toBe(true);

    // Also verify the values are reasonable
    expect(Math.abs(result.re)).toBeLessThan(1);
    expect(Math.abs(result.im)).toBeLessThan(1);
  });
});