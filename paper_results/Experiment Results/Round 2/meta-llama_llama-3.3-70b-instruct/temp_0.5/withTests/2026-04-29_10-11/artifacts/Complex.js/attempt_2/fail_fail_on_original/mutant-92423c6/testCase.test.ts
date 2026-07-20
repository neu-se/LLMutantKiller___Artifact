import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should handle the cosm1 function correctly', () => {
    const complex = new Complex(0.1);
    const result = complex.expm1();
    const expected = new Complex(Math.expm1(0.1), 0);
    expect(result.equals(expected)).toBe(true);
  });
});