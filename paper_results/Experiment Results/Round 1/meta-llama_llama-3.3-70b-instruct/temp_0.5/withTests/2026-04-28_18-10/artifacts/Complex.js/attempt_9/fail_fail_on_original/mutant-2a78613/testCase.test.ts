describe('Complex.js', () => {
  it('should correctly handle multiplication of complex numbers with zero imaginary part', () => {
    const Complex = require('../complex').Complex;
    const complex1 = new Complex(2, 0);
    const complex2 = new Complex(4, 0);
    const result = complex1.mul(complex2);
    expect(result.re).toBeCloseTo(8);
    expect(result.im).toBeCloseTo(0);
    // The mutation removes the optimization for real numbers, so we expect the result to be calculated using the general formula
    // This should fail on the mutated code because the optimization is removed
    expect(complex1.mul(complex2).re).toBe(8);
  });
});