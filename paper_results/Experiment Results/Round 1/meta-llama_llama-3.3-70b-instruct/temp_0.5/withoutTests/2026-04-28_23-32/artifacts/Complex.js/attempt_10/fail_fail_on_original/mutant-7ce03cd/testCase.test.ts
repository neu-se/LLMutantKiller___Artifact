import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly handle zero and infinity in multiplication', () => {
    const complex = new Complex(Infinity, Infinity);
    const zero = new Complex(0, 0);
    const result = complex.mul(zero);
    expect(result.isInfinite()).toBe(true);
    expect(() => zero.mul(complex)).not.toThrow();
  });
});