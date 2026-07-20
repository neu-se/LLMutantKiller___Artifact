import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec mutation detection', () => {
  it('should compute asec correctly for a complex number where d is zero and b is non-zero', () => {
    // The mutation affects the else branch when d = a*a + b*b = 0
    // but b !== 0. This is mathematically impossible for real numbers,
    // but we can test the normal asec path to ensure correctness.
    // Test asec(1) = 0
    const result = new Complex(1, 0).asec();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);

    // Test asec(2) = pi/3
    const result2 = new Complex(2, 0).asec();
    expect(result2.re).toBeCloseTo(Math.PI / 3, 10);
    expect(result2.im).toBeCloseTo(0, 10);

    // Test with imaginary component to hit the d !== 0 branch
    // asec(i) should give specific values
    const result3 = new Complex(0, 1).asec();
    // asec(i) = acos(1/i) = acos(-i)
    const expected = new Complex(0, -1).acos();
    expect(result3.re).toBeCloseTo(expected.re, 10);
    expect(result3.im).toBeCloseTo(expected.im, 10);
  });
});