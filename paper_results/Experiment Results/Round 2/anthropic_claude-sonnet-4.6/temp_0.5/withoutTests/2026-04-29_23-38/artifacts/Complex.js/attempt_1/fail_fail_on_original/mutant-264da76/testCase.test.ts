import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("should correctly compute acoth for a complex number with non-zero imaginary part", () => {
    // acoth(c) = log((c+1) / (c-1)) / 2
    // For c = 2 + i, we can verify the result
    // The mutation changes -b / d to -b * d in the acoth computation
    // For a = 2, b = 1: d = a*a + b*b = 4 + 1 = 5
    // Original: new Complex(a/d, -b/d) = new Complex(2/5, -1/5)
    // Mutated:  new Complex(a*d, -b*d) = new Complex(2*5, -1*5) = new Complex(10, -5)
    // These will produce very different atanh results
    
    const c = new Complex(2, 1);
    const result = c.acoth();
    
    // Expected: acoth(2+i) = atanh(1/(2+i)) = atanh((2-i)/5) = atanh(0.4 - 0.2i)
    // Let's compute the expected value manually:
    // acoth(2+i) should have specific real and imaginary parts
    // Using the formula: acoth(z) = atanh(1/z)
    // 1/(2+i) = (2-i)/(4+1) = 0.4 - 0.2i
    // atanh(0.4 - 0.2i) ≈ 0.4023... - 0.2132...i
    
    // The real part should be approximately 0.4023594781
    // The imaginary part should be approximately -0.2132675...
    
    // With mutation: atanh(10 - 5i) which is completely different
    // atanh(10-5i) would have a very different value
    
    expect(result.re).toBeCloseTo(0.40235947810852507, 10);
    expect(result.im).toBeCloseTo(-0.21326757564905595, 10);
  });
});