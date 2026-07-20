import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should handle asech correctly', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.asech();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
    const complex2 = new Complex(0, 1);
    const result2 = complex2.asech();
    expect(result2.re).toBeCloseTo(0, 10);
    expect(result2.im).toBeCloseTo(Math.PI / 2, 10);
    const complex3 = new Complex(0, 0);
    const result3 = complex3.asech();
    expect(result3.re).toBeCloseTo(Infinity, 10);
    expect(result3.im).toBeCloseTo(0, 10);
  });
});