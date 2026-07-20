import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should handle addition with infinity correctly', () => {
    const c1 = new Complex(1, 2);
    const c2 = new Complex(Infinity, Infinity);
    const result = c1.add(c2);
    expect(result.toString()).toBe('Infinity');
  });
});