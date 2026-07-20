import { Complex } from '../complex';

describe('Complex', () => {
  it('should handle atanh correctly', () => {
    const complex = new Complex(-0.5, 0);
    const result = complex.atanh();
    const expected = new Complex(0.5493061443340548, 0);
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});