import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly calculate division of complex numbers', () => {
    const c1 = new Complex(1, 2);
    const c2 = new Complex(3, 4);
    const result = c1.div(c2);
    const expectedReal = (1 * 3 + 2 * 4) / (3 * 3 + 4 * 4);
    const expectedImag = (2 * 3 - 1 * 4) / (3 * 3 + 4 * 4);
    expect(result.re).toBeCloseTo(expectedReal, 10);
    expect(result.im).toBeCloseTo(expectedImag, 10);
  });
});