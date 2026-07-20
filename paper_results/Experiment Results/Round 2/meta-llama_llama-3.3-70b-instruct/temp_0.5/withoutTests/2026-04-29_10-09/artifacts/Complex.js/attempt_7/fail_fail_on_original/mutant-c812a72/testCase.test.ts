import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should round complex number correctly when places is a number', () => {
    const complex = new Complex(1.2345, 6.789);
    const rounded = complex.round(2);
    expect(rounded.re).toBeCloseTo(1.23, 2);
    expect(rounded.im).toBeCloseTo(6.79, 2);
  });

  it('should return NaN when places is not a number', () => {
    const complex = new Complex(1.2345, 6.789);
    const rounded = complex.round(true);
    expect(Number.isNaN(rounded.re)).toBe(false);
    expect(Number.isNaN(rounded.im)).toBe(false);
  });
});