import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex asech', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.asech();
    expect(result.re).toBeCloseTo(1.3169578969248166);
    expect(result.im).toBeCloseTo(0);
    const complex2 = new Complex(0.5, 0.5);
    const result2 = complex2.asech();
    expect(result2.re).toBeNaN();
    expect(result2.im).toBeNaN();
    expect(complex2.re).toBeCloseTo(0.5);
    expect(complex2.im).toBeCloseTo(0.5);
    expect(complex2.asech().re).not.toBe(complex2.re);
    expect(complex2.asech().im).not.toBe(complex2.im);
  });
});