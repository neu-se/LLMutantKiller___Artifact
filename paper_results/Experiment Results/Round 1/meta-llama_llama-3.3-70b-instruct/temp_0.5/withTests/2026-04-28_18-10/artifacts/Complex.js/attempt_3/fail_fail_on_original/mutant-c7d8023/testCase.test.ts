import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acsch for b === 0 and b !== 0', () => {
    const complex1 = new Complex(0, 0);
    const result1 = complex1.acsch();
    expect(result1.toString()).toBe('Infinity');

    const complex2 = new Complex(0, 1);
    const result2 = complex2.acsch();
    expect(result2.re).toBeCloseTo(-0.881374, 5);
    expect(result2.im).toBeCloseTo(0, 5);
  });
});