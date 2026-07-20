import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate the complex secant correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.sec();
    const expected = new Complex(0.2717525853198426, 0.2717525853198426);
    expect(result.re).toBeCloseTo(expected.re, 6);
    expect(result.im).toBeCloseTo(expected.im, 6);
  });
});