import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return a finite number when places is not provided', () => {
    const complex = new Complex(1.2345, 6.789);
    const rounded = complex.round();
    expect(Number.isFinite(rounded.re)).toBe(true);
    expect(Number.isFinite(rounded.im)).toBe(true);
  });

  it('should return a finite number when places is 0', () => {
    const complex = new Complex(1.2345, 6.789);
    const rounded = complex.round(0);
    expect(Number.isFinite(rounded.re)).toBe(true);
    expect(Number.isFinite(rounded.im)).toBe(true);
  });

  it('should return a finite number when places is a positive number', () => {
    const complex = new Complex(1.2345, 6.789);
    const rounded = complex.round(2);
    expect(Number.isFinite(rounded.re)).toBe(true);
    expect(Number.isFinite(rounded.im)).toBe(true);
  });
});