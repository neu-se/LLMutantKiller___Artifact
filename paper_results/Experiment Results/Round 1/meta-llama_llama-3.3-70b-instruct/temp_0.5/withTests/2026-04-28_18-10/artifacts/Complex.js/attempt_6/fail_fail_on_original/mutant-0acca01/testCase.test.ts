import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should return the correct result for acoth', () => {
    const complex = new Complex(2, 3);
    const result = complex.acoth();
    expect(result.re).toBeCloseTo(2 / (2 * 2 + 3 * 3));
    expect(result.im).toBeCloseTo(-3 / (2 * 2 + 3 * 3));
  });
});