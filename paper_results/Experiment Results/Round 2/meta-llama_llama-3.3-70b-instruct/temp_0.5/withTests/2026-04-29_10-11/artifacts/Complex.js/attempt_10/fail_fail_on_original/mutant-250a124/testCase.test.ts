import { Complex } from '../../complex.js';

describe('Complex.js', () => {
  it('should correctly calculate division of complex numbers', () => {
    const complex1 = new Complex(1, 2);
    const complex2 = new Complex(2, 1);
    const result = complex1.div(complex2);
    const expectedRe = (1*2 - 2*1) / (2*2 + 1*1);
    const expectedIm = (1*1 + 2*2) / (2*2 + 1*1);
    expect(result.re).toBeCloseTo(expectedRe, 5);
    expect(result.im).toBeCloseTo(expectedIm, 5);
  });
});