import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should calculate acsch correctly for a real number', () => {
    const complex = new Complex(2, 0);
    const result = complex.acsch();
    expect(result.re).toBeGreaterThan(0);
    expect(result.im).toBeCloseTo(0, 10);
    expect(complex.acsch().re).not.toBe(complex.acsch().im);
  });
});