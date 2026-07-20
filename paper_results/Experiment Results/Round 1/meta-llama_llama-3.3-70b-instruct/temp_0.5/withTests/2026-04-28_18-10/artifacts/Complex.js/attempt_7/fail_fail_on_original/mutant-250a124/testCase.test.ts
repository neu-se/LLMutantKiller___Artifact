import { Complex } from '../../complex.js';

describe('Complex.js', () => {
  it('should calculate division correctly', () => {
    const complex1 = new Complex(1, 2);
    const complex2 = new Complex(3, 4);
    const result = complex1.div(complex2);
    const expectedRe = (1 * 3 + 2 * 4) / (3 * 3 + 4 * 4);
    const expectedIm = (2 * 3 - 1 * 4) / (3 * 3 + 4 * 4);
    expect(result.re).toBeCloseTo(expectedRe, 5);
    expect(result.im).toBeCloseTo(expectedIm, 5);
  });
});