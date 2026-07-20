import { Complex } from './complex';

describe('Complex', () => {
  it('asech should return the correct result for a non-zero complex number', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.asech();
    const complex2 = new Complex(0, 0);
    const result2 = complex2.asech();
    expect(result.re).not.toBe(result2.re);
  });
});