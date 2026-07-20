import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should calculate the complex secant correctly for a specific input', () => {
    const complex = new Complex(1, 0);
    const result = complex.sec();
    const expected = new Complex(1.0, 0.0);
    expect(result.re).toBeCloseTo(expected.re, 6);
    expect(result.im).toBeCloseTo(expected.im, 6);
  });
});