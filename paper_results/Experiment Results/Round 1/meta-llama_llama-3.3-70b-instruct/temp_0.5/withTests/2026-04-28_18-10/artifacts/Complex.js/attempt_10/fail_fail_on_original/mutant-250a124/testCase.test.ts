import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should calculate division correctly', () => {
    const complex1 = new Complex(4, 3);
    const complex2 = new Complex(1, 2);
    const result = complex1.div(complex2);
    const expectedRe = (4 * 1 + 3 * 2) / (1 * 1 + 2 * 2);
    const expectedIm = (3 * 1 - 4 * 2) / (1 * 1 + 2 * 2);
    expect(result.re).toBeCloseTo(expectedRe, 5);
    expect(result.im).toBeCloseTo(expectedIm, 5);
  });
});