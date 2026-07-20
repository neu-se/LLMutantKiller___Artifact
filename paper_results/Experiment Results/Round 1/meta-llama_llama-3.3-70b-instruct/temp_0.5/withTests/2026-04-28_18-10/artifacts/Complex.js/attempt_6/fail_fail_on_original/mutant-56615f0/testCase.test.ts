import { Complex } from '../../complex.js';

describe('Complex.js', () => {
  it('should calculate acsch correctly', () => {
    const complex = new Complex(1, 0);
    expect(complex.acsch().re).toBeCloseTo(0.881, 3);
  });
});