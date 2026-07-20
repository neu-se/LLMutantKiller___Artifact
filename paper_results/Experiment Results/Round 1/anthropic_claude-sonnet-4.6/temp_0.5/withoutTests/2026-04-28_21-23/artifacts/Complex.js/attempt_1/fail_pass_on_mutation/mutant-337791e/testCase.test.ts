import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex exp function', () => {
  it('should correctly compute exp of a purely real number', () => {
    // For z = 2 + 0i, exp(z) = e^2 * (cos(0) + i*sin(0)) = e^2 + 0i
    const z = new Complex(2, 0);
    const result = z.exp();
    
    expect(result.re).toBeCloseTo(Math.exp(2), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});