import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc', () => {
  it('acsc of a complex number with positive imaginary part has correct sign on real part', () => {
    // Use a normal input that exercises the d !== 0 path
    // acsc(1 + i) should have specific re/im values
    // asin(1/(1+i)) = asin((1-i)/2)
    const result = new Complex(1, 1).acsc();
    // The real part should be positive (acsc of complex number in first quadrant)
    expect(result.re).toBeGreaterThan(0);
    // Verify against known value: acsc(1+i) ≈ 0.4522784... + 0.5306375...i  
    expect(result.re).toBeCloseTo(0.45227844715119064, 10);
    expect(result.im).toBeCloseTo(-0.5306375309525178, 10);
  });
});