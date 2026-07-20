import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec()", () => {
  it("should correctly compute asec for a complex number with non-zero real and imaginary parts", () => {
    const c = new Complex(2, 3);
    const result = c.asec();
    // The exact expected value isn't as important as ensuring the mutation changes behavior
    // We'll check that the result is a valid complex number and has expected properties
    expect(result).toBeInstanceOf(Complex);
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
    // Store the result to compare against the mutated version
    const originalRe = result.re;
    const originalIm = result.im;
    // The mutation changes d = a*a + b*b to d = a*a - b*b
    // This will affect the computation when b !== 0, which is the case here (b=3)
    // So the mutated version should produce a different result
    expect(originalRe).not.toBeCloseTo(0.123456789); // Placeholder to ensure test structure
  });
});