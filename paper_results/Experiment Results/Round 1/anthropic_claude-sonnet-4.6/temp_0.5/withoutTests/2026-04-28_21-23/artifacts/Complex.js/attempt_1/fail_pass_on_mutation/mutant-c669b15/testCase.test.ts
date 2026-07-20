import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex division with equal absolute values in divisor', () => {
  it('should correctly divide complex numbers when |c| equals |d| in divisor', () => {
    // Divide (3 + 2i) by (1 + 1i)
    // Expected: (3+2i)/(1+1i) = (3+2i)(1-1i)/2 = (3-3i+2i-2i^2)/2 = (3+2+(-1)i)/2 = (5-i)/2 = 2.5 - 0.5i
    const result = new Complex(3, 2).div(new Complex(1, 1));
    expect(result.re).toBeCloseTo(2.5, 10);
    expect(result.im).toBeCloseTo(-0.5, 10);
  });
});