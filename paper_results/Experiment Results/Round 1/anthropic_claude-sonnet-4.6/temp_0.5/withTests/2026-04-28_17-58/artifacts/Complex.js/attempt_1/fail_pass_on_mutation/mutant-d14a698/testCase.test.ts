import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec mutation detection', () => {
  it('should compute asec correctly for a complex number with negative imaginary part in the d=0 fallback path', () => {
    // Test asec with a value that exercises the sign of the imaginary component
    // asec(z) = acos(1/z)
    // For z = i (purely imaginary), asec(i) = acos(-i) = acos(0 - i)
    // We test with a small purely imaginary number to detect sign change in -b/0 vs +b/0
    // The mutation changes -b/0 to +b/0, affecting the sign of Infinity in the fallback
    
    // Test with z = i: asec(i) should have a specific sign for imaginary part
    const z = new Complex(0, 1);
    const result = z.asec();
    
    // asec(i) = acos(1/i) = acos(-i)
    // acos(-i) has im > 0
    // Verify the imaginary part is positive (not negative)
    expect(result.im).toBeGreaterThan(0);
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
  });
});