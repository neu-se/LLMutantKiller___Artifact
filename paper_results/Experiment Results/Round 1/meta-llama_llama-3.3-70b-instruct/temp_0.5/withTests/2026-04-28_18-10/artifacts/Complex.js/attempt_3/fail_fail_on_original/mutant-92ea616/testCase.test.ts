import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return a valid result for acot when d is not zero', () => {
    const complex = new Complex(1, 2);
    const result = complex.acot();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(result.re).not.toBe(Infinity);
    expect(result.im).not.toBe(Infinity);
    expect(complex.acot().re).toBeCloseTo(-0.46364760900080615);
    expect(complex.acot().im).toBeCloseTo(-0.46364760900080615);
    expect(complex.acot().re).not.toBe(complex.acot().im);
    expect(complex.acot().re).toBeCloseTo(complex.acot().re);
    expect(complex.acot().im).toBeCloseTo(complex.acot().im);
    expect(complex.acot().re + complex.acot().im).not.toBe(0);
    expect(complex.acot().re - complex.acot().im).not.toBe(0);
    expect(complex.acot().re * complex.acot().im).not.toBe(0);
    expect(complex.acot().re / complex.acot().im).not.toBe(0);
    expect(complex.acot().re % complex.acot().im).not.toBe(0);
    expect(complex.acot().re ** complex.acot().im).not.toBe(0);
    expect(complex.acot().re + complex.acot().im).toBeCloseTo(-0.9272952180016123);
    expect(complex.acot().re - complex.acot().im).toBeCloseTo(0);
    expect(complex.acot().re).toBeCloseTo(complex.acot().re);
    expect(complex.acot().im).toBeCloseTo(complex.acot().im);
    expect(complex.acot().re).toBeCloseTo(-0.46364760900080615);
    expect(complex.acot().im).toBeCloseTo(-0.46364760900080615);
    expect(complex.acot().re + complex.acot().im).toBeCloseTo(-0.9272952180016123);
    expect(complex.acot().re - complex.acot().im).toBeCloseTo(0);
    expect(complex.acot().re + complex.acot().im).toBeCloseTo(-0.9272952180016123);
    expect(complex.acot().re - complex.acot().im).toBeCloseTo(0);
    expect(complex.acot().re).toBeCloseTo(complex.acot().re);
    expect(complex.acot().im).toBeCloseTo(complex.acot().im);
    expect(complex.acot().re).toBeCloseTo(-0.46364760900080615);
    expect(complex.acot().im).toBeCloseTo(-0.46364760900080615);
  });
});