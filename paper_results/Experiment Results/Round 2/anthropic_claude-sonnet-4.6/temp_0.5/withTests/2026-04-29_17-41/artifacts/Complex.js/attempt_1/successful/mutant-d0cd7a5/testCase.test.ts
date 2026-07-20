import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should compute acsch of a purely imaginary number correctly", () => {
    // For z = 2i (a=0, b=2), d = 4
    // Original uses -b/d = -0.5 for imaginary part of intermediate value
    // Mutated uses +b/d = +0.5 for imaginary part of intermediate value
    // This produces different results for the imaginary part of acsch(2i)
    const z = new Complex(0, 2);
    const result = z.acsch();

    // acsch(2i) = log((1 + sqrt(1 + (2i)^2)) / (2i))
    //           = log((1 + sqrt(1 - 4)) / (2i))
    //           = log((1 + sqrt(-3)) / (2i))
    // The imaginary part should be negative (approximately -π/6 ≈ -0.5236)
    // In the mutated version, the sign of the imaginary part would be flipped
    
    // The real part should be 0 (since input is purely imaginary)
    expect(result.re).toBeCloseTo(0, 10);
    
    // The imaginary part should be negative: asin(1/2) negated = -π/6
    // Original: negative imaginary part
    // Mutated: positive imaginary part
    expect(result.im).toBeLessThan(0);
    expect(result.im).toBeCloseTo(-Math.PI / 6, 10);
  });
});