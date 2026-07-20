import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should correctly handle multiplication of complex numbers', () => {
    const c1 = new Complex(1, 2);
    const c2 = new Complex(3, 0);
    const result = c1.mul(c2);
    expect(result.re).toBe(3);
    expect(result.im).toBe(6);
    expect(() => {
      const c3 = new Complex(1, 2);
      const c4 = new Complex(3, 0);
      const result2 = c3.mul(c4);
      result2[""];
    }).toThrow();
  });
});