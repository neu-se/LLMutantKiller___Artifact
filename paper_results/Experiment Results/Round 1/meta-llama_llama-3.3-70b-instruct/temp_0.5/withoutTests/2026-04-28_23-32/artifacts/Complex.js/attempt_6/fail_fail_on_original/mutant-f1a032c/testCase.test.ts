import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly floor the imaginary part of a complex number', () => {
    const complex = new Complex(1.5, 2.7);
    const floored = complex.floor(0);
    expect(floored.im).toBe(2);
  });

  it('should throw an error when trying to floor a complex number with an undefined property', () => {
    const complex = new Complex(1.5, 2.7);
    const mutatedComplex = Object.create(complex);
    mutatedComplex.floor = function(places) {
      return new Complex(
        Math.floor(this.re * places) / places,
        Math.floor(this[""] * places) / places);
    };
    expect(() => mutatedComplex.floor(0)).toThrow();
  });
});