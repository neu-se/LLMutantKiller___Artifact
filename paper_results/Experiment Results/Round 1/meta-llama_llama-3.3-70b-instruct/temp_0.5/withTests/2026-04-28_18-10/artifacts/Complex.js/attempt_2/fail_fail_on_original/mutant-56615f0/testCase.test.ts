import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should calculate acsch correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(0.881, 3);
    expect(result.im).toBeCloseTo(0, 3);
  });
});