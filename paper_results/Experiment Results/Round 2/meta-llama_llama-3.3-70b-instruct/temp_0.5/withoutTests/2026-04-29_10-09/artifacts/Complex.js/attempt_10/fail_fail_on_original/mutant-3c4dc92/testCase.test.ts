import { Complex } from '../../complex';

describe('Complex', () => {
  it('should calculate atanh correctly', () => {
    const complex = new Complex(0.9, 0);
    const result = complex.atanh();
    const expected = new Complex(1.151292546497023, 0);
    expect(result.equals(expected.re, expected.im)).toBe(true);
  });
});