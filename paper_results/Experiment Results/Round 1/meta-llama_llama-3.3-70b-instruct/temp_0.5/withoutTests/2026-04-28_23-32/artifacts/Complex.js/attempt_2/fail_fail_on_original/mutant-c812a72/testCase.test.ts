import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should round correctly with a valid places value', () => {
    const complex = new Complex(1.2345, 6.789);
    const rounded = complex.round(2);
    expect(rounded.re).toBeCloseTo(1.23);
    expect(rounded.im).toBeCloseTo(6.79);
  });

  it('should throw an error when places is not a number', () => {
    const complex = new Complex(1.2345, 6.789);
    expect(() => complex.round(true)).toThrow();
  });
});