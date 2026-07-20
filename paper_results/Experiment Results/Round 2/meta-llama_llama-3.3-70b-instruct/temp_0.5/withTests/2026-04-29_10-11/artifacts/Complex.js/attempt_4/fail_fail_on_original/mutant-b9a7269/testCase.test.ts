import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly floor the complex number with a specified number of decimal places', () => {
    const complex = new Complex(1.234, 5.678);
    const flooredComplex = complex.floor(2);
    expect(flooredComplex.re).toBeCloseTo(1.23);
    expect(flooredComplex.im).toBeCloseTo(5.68);
  });

  it('should correctly floor the complex number with no decimal places specified', () => {
    const complex = new Complex(1.234, 5.678);
    const flooredComplex = complex.floor(0);
    expect(flooredComplex.re).toBeCloseTo(1);
    expect(flooredComplex.im).toBeCloseTo(5);
  });

  it('should throw an error when trying to floor with a non-numeric number of decimal places', () => {
    const complex = new Complex(1.234, 5.678);
    expect(() => complex.floor('a')).toThrowError();
  });

  it('should correctly floor the complex number when places is true in the mutated code', () => {
    const complex = new Complex(1.234, 5.678);
    const flooredComplex = complex.floor(true);
    expect(flooredComplex.re).toBeNaN();
    expect(flooredComplex.im).toBeNaN();
  });
});