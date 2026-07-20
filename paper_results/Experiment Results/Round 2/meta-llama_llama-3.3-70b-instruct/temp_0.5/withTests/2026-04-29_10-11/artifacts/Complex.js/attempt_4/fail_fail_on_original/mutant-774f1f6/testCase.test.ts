import { Complex } from "./complex.js";

describe('Complex.js', () => {
  it('should create a new complex number with default values when no arguments are provided and the real part is correctly assigned', () => {
    const complex = new Complex(null);
    expect(complex.re).toBe(0);
    expect(complex.hasOwnProperty('re')).toBe(true);
  });
});