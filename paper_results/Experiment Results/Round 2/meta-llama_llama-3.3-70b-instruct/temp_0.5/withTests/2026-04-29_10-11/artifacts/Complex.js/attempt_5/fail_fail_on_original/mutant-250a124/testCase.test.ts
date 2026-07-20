import Complex from '../complex.js';

describe('Complex.js', () => {
  it('should correctly calculate division of complex numbers', () => {
    const complex1 = new Complex(1, 2);
    const complex2 = new Complex(2, 1);
    const result = complex1.div(complex2);
    expect(result.re).toBeCloseTo(1.25, 5);
    expect(result.im).toBeCloseTo(-0.25, 5);
  });
});