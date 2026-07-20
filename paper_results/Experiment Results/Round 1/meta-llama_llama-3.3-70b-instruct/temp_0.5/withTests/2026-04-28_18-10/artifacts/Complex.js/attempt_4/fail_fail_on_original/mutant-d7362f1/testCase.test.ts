import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly multiply two complex numbers', () => {
    const c1 = new Complex(1, 0);
    const c2 = new Complex(2, 0);
    const result = c1.mul(c2);
    expect(result.re).toBe(2);
    expect(result.im).toBe(0);
    const c3 = new Complex(0, 1);
    const c4 = new Complex(0, 2);
    const result2 = c3.mul(c4);
    expect(result2.re).toBe(-2);
    expect(result2.im).toBe(0);
  });
});