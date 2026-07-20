import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should round complex number correctly when places is 2', () => {
    const complex = new Complex(1.2345, 6.789);
    const rounded = complex.round(2);
    expect(rounded.re).toBeCloseTo(1.23, 2);
    expect(rounded.im).toBeCloseTo(6.79, 2);
  });

  it('should round complex number correctly when places is not provided', () => {
    const complex = new Complex(1.2345, 6.789);
    const rounded = complex.round();
    expect(rounded.re).toBeCloseTo(1, 0);
    expect(rounded.im).toBeCloseTo(7, 0);
  });

  it('should round complex number correctly when places is 0', () => {
    const complex = new Complex(1.2345, 6.789);
    const rounded = complex.round(0);
    expect(rounded.re).toBeCloseTo(1, 0);
    expect(rounded.im).toBeCloseTo(7, 0);
  });

  it('should not return NaN when places is not provided', () => {
    const complex = new Complex(1.2345, 6.789);
    const rounded = complex.round();
    expect(Number.isFinite(rounded.re)).toBe(true);
    expect(Number.isFinite(rounded.im)).toBe(true);
  });
});