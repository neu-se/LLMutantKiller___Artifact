import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly floor the complex number with a specified number of decimal places', () => {
    const complex = new Complex(1.234, 5.678);
    const flooredComplex = complex.floor(2);
    expect(flooredComplex.re).toBeCloseTo(1.23);
    expect(flooredComplex.im).toBeCloseTo(5.68);
  });

  it('should not return NaN when trying to floor with no decimal places', () => {
    const complex = new Complex(1.234, 5.678);
    const flooredComplex = complex.floor();
    expect(isNaN(flooredComplex.re)).toBe(false);
    expect(isNaN(flooredComplex.im)).toBe(false);
  });
});