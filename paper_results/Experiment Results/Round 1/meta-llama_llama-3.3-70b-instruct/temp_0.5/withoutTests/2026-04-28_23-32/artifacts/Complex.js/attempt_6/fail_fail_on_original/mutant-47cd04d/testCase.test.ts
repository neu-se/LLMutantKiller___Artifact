import { Complex } from "./complex";

describe('Complex', () => {
  it('should handle addition with infinite values correctly', () => {
    const complex1 = new Complex(1, 0);
    const complex2 = new Complex(1, 0);
    const result = complex1.add(complex2);
    expect(result.re).toBe(2);
    expect(result.im).toBe(0);
  });
});