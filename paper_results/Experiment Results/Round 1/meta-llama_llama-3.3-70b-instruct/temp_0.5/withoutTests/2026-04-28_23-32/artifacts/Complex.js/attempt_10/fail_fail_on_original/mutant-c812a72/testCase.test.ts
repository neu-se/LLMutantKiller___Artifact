import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should round correctly with a valid places value and throw an error when passing a boolean to the round method in the mutated code', () => {
    const complex = new Complex(1.2345, 6.789);
    const rounded1 = complex.round(2);
    expect(rounded1.re).toBeCloseTo(1.23);
    expect(rounded1.im).toBeCloseTo(6.79);
    expect(() => complex.round(true)).toThrow();
  });
});