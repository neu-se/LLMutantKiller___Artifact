import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
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

  it('should round complex number correctly when places is a positive number', () => {
    const complex = new Complex(1.2345, 6.789);
    const rounded = complex.round(2);
    expect(rounded.re).toBeCloseTo(1.23, 2);
    expect(rounded.im).toBeCloseTo(6.79, 2);
  });

  it('should not return NaN when places is not provided', () => {
    const complex = new Complex(1.2345, 6.789);
    const rounded = complex.round();
    expect(!isNaN(rounded.re)).toBe(true);
    expect(!isNaN(rounded.im)).toBe(true);
  });

  it('should not return NaN when places is 0', () => {
    const complex = new Complex(1.2345, 6.789);
    const rounded = complex.round(0);
    expect(!isNaN(rounded.re)).toBe(true);
    expect(!isNaN(rounded.im)).toBe(true);
  });
});