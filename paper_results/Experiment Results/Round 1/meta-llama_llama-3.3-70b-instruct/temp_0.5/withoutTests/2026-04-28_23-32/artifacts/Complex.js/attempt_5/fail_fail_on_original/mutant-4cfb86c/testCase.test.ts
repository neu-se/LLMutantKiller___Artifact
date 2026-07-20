import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when calculating the complex acotangent with a === 0', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.acot()).toThrowError();
  });
});