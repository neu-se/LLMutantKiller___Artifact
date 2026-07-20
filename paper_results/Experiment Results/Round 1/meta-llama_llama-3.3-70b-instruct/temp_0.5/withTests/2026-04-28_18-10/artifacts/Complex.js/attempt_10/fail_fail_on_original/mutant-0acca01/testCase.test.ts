import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return the correct result for acoth', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    expect(result.re).toBeCloseTo(complex.re / (complex.re * complex.re + complex.im * complex.im));
    expect(result.im).toBeCloseTo(-complex.im / (complex.re * complex.re + complex.im * complex.im));
  });
});