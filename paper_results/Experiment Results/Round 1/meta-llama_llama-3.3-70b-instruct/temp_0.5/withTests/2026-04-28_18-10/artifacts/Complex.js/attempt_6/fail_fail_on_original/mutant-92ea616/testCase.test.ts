import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return a valid result for acot when d is not zero', () => {
    const complex = new Complex(1, 2);
    const result = complex.acot();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(result.re).not.toBe(Infinity);
    expect(result.im).not.toBe(Infinity);
    expect(complex.acot().re).not.toBe(complex.acot().im);
    const complex2 = new Complex(1, 1);
    expect(complex2.acot().re).not.toBe(complex2.acot().im);
    expect(complex2.acot().re).toBeCloseTo(-0.46364760900080615);
    expect(complex2.acot().im).toBeCloseTo(-0.46364760900080615);
    expect(complex2.acot().re).not.toBe(complex2.acot().im);
    expect(complex2.acot().re).toBeCloseTo(-0.46364760900080615);
    expect(complex2.acot().im).toBeCloseTo(-0.46364760900080615);
    expect(complex2.acot().re).toBeCloseTo(complex2.acot().re);
    expect(complex2.acot().im).toBeCloseTo(complex2.acot().im);
    expect(complex2.acot().re).toBeCloseTo(-0.46364760900080615);
    expect(complex2.acot().im).toBeCloseTo(-0.46364760900080615);
    expect(complex2.acot().re).toBeCloseTo(complex2.acot().re);
    expect(complex2.acot().im).toBeCloseTo(complex2.acot().im);
    expect(complex2.acot().re).toBeCloseTo(-0.46364760900080615);
    expect(complex2.acot().im).toBeCloseTo(-0.46364760900080615);
    expect(complex2.acot().re).toBeCloseTo(complex2.acot().re);
    expect(complex2.acot().im).toBeCloseTo(complex2.acot().im);
  });
});