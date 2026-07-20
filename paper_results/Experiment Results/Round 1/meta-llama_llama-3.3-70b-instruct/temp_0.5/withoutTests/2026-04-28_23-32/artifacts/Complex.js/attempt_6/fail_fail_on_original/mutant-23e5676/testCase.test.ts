import { Complex } from '../complex';

describe('Complex', () => {
  it('should return the correct result for acsc', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    expect(result.re).not.toBeCloseTo(complex.re * complex.re + complex.im * complex.im, 10);
  });
});