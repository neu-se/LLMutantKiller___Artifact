import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc mutation detection", () => {
  it("should correctly compute acsc for a complex number with non-zero imaginary part", () => {
    // acsc(c) = -i * log(i/c + sqrt(1 - 1/c^2))
    // The mutation changes -b/d to +b/d in the asin delegation path
    // For z = 1 + i, d = 1 + 1 = 2
    // Original: new Complex(1/2, -1/2).asin()
    // Mutated:  new Complex(1/2, +1/2).asin()
    // These produce different results
    
    const z = new Complex(1, 1);
    const result = z.acsc();
    
    // Compute expected value: acsc(1+i) = asin(1/(1+i)) = asin((1-i)/2)
    // 1/(1+i) = (1-i)/((1+i)(1-i)) = (1-i)/2 = 0.5 - 0.5i
    const expected = new Complex(0.5, -0.5).asin();
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
    
    // Also verify the imaginary part has the correct sign
    // For acsc(1+i), the imaginary part should be negative
    // The mutated version would give a different (wrong) imaginary part
    expect(result.im).toBeLessThan(0);
  });
});