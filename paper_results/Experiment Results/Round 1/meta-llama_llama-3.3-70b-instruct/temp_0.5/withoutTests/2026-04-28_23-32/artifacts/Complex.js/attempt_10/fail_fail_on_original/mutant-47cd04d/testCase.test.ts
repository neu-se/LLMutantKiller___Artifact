import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should handle addition with finite and infinite values correctly', () => {
    const complex1 = new Complex(Infinity, 0);
    const complex2 = new Complex(1, 0);
    const result = complex1.add(complex2);
    expect(result.toString()).toBe('Infinity');
    const complex3 = new Complex(1, 0);
    const complex4 = new Complex(1, 0);
    const result2 = complex3.add(complex4);
    expect(result2.toString()).not.toBe('Infinity');
  });
});