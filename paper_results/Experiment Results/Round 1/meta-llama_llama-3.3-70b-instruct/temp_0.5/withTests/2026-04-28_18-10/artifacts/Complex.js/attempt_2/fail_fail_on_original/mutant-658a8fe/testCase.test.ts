import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should return the correct result for the acsch function when d is zero', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.acsch()).toThrowError();
  });
});