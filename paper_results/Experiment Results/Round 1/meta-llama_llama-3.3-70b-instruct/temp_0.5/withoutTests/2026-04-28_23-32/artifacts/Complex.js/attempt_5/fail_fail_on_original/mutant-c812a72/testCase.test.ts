import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should round correctly with a valid places value and not throw an error with a boolean places value', () => {
    const complex = new Complex(1.2345, 6.789);
    const rounded1 = complex.round(2);
    expect(rounded1.re).toBeCloseTo(1.23);
    expect(rounded1.im).toBeCloseTo(6.79);
    const rounded2 = complex.round(true);
    expect(rounded2.re).toBeCloseTo(1);
    expect(rounded2.im).toBeCloseTo(7);
  });
});