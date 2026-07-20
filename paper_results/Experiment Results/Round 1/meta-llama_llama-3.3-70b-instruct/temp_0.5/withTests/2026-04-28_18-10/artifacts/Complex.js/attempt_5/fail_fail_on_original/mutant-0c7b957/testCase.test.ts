import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should calculate the complex atanh correctly', () => {
    const complex = new Complex(2, 1);
    const result = complex.atanh();
    const originalResult = new Complex(
      0.5493061443340548,
      0.5493061443340548
    );
    expect(result.re).toBeCloseTo(originalResult.re);
    expect(result.im).toBeCloseTo(originalResult.im);
  });
});