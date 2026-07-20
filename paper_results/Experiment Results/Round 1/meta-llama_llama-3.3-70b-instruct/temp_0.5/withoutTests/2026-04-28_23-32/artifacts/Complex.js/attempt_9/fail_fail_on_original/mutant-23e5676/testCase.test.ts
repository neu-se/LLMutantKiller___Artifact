import { Complex } from './complex';

describe('Complex', () => {
  it('should return the correct result for acsc', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    const d = complex.re * complex.re + complex.im * complex.im;
    expect(result.re).toBeCloseTo(complex.re / d, 10);
    expect(result.im).toBeCloseTo(-complex.im / d, 10);
  });
});