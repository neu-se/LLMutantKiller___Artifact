import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acsch', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(-0.881374, 5);
    expect(result.im).toBeCloseTo(0, 5);
    const complex2 = new Complex(0, 0);
    const result2 = complex2.acsch();
    expect(result2.toString()).toBe('Infinity');
  });
});