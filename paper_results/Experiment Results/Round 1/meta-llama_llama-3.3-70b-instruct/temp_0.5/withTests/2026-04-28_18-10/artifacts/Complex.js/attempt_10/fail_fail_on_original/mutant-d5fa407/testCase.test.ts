import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate acot correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.acot();
    expect(result.im).not.toBe(0);
    const complex2 = new Complex(1, 0);
    const result2 = complex2.acot();
    expect(result2.re).toBeCloseTo(0, 5);
    expect(result2.im).toBeCloseTo(Math.PI / 2, 5);
    const complex3 = new Complex(0, 1);
    const result3 = complex3.acot();
    expect(result3.re).toBeCloseTo(0, 5);
    expect(result3.im).toBeCloseTo(-Math.PI / 2, 5);
    expect(complex.acot().im).not.toBe(complex2.acot().im);
    expect(complex.acot().im).not.toBe(complex3.acot().im);
  });
});