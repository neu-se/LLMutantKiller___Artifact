import { Complex } from '../../../complex';

describe('Complex', () => {
  it('should correctly calculate atanh for the value 1.5', () => {
    const complex = new Complex(1.5, 0);
    const result = complex.atanh();
    const expected = new Complex(0.5493061443340549, 0);
    expect(result.equals(expected.re, expected.im)).toBe(true);
  });
});