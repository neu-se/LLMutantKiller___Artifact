import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex exp method", () => {
  it("should correctly compute exp of a complex number with non-zero imaginary part", () => {
    // With original: im !== 0 causes undefined return (outer if skipped)
    // With mutated: im !== 0 enters the if block and returns a valid Complex
    // Wait - need to verify which way causes the observable difference
    const c = new Complex(0, Math.PI);
    const result = c.exp();
    
    // exp(i*pi) = cos(pi) + i*sin(pi) = -1 + 0i
    expect(result).toBeDefined();
    expect(result.re).toBeCloseTo(-1, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});