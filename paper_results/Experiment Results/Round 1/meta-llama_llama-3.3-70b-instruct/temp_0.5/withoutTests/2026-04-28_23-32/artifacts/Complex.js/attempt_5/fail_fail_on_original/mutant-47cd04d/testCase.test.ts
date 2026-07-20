import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should handle addition with infinite values correctly', () => {
    const complex1 = new Complex(1, 0);
    const complex2 = new Complex(Infinity, 0);
    const result = complex1.add(complex2);
    expect(result.toString()).toBe('Infinity');
  });
});