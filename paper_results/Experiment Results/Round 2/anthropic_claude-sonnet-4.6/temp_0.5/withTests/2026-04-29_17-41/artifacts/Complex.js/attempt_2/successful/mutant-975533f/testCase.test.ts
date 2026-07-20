import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("should compute acoth with negative imaginary sign for complex input", () => {
    // acoth(c) = log((c+1) / (c-1)) / 2
    // For c = 2 + i:
    // d = 4 + 1 = 5
    // original: calls atanh(2/5, -1/5) = atanh(0.4 - 0.2i)
    // mutated:  calls atanh(2/5, +1/5) = atanh(0.4 + 0.2i)
    // The imaginary parts of these results should differ in sign
    
    const c = new Complex(2, 1);
    const result = c.acoth();
    
    // The mutated code passes +b/d instead of -b/d to atanh
    // so the imaginary part of the result will have opposite sign
    // We verify the imaginary part is negative (original) not positive (mutated)
    
    // atanh(0.4 - 0.2i) has a negative imaginary part
    // atanh(0.4 + 0.2i) has a positive imaginary part
    expect(result.im).toBeLessThan(0);
    
    // Also verify the real part is positive
    expect(result.re).toBeGreaterThan(0);
    
    // Cross-check: acoth(2+i) conjugate should equal acoth(2-i)
    const cConj = new Complex(2, -1);
    const resultConj = cConj.acoth();
    
    // acoth(conj(z)) = conj(acoth(z)), so im parts should be negatives of each other
    expect(result.re).toBeCloseTo(resultConj.re, 10);
    expect(result.im).toBeCloseTo(-resultConj.im, 10);
  });
});