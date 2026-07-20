import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should correctly compute acsch for a complex number with both non-zero real and imaginary parts", () => {
    // For z = 1 + i:
    // Original: d = 1*1 + 1*1 = 2, computes new Complex(1/2, -1/2).asinh()
    // Mutated: d = 1*1 - 1*1 = 0, falls into the NaN branch
    const z = new Complex(1, 1);
    const result = z.acsch();
    
    // The result should be a finite complex number, not NaN
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
    
    // Verify the actual value: acsch(1+i) should have specific real and imaginary parts
    // acsch(z) = asinh(1/z) = asinh((1-i)/2)
    // Let's compute the expected value numerically
    // 1/z = (1-i)/2 = 0.5 - 0.5i
    // asinh(0.5 - 0.5i) ≈ 0.5306375... - 0.4522784...i
    expect(result.re).toBeCloseTo(0.5306375309525178, 10);
    expect(result.im).toBeCloseTo(-0.45227844715119064, 10);
  });
});