import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should round complex number correctly', () => {
    const complex = new Complex(1.2345, 6.789);
    const rounded = complex.round(2);
    expect(rounded.re).toBeCloseTo(1.23, 2);
    expect(rounded.im).toBeCloseTo(6.79, 2);
  });

  it('should round complex number with places as 0', () => {
    const complex = new Complex(1.2345, 6.789);
    const rounded = complex.round(0);
    expect(rounded.re).toBeCloseTo(1, 0);
    expect(rounded.im).toBeCloseTo(7, 0);
  });
});