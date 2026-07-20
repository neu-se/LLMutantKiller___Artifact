import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error for the mutated acsch function', () => {
    const complex = new Complex(1, 2);
    expect(() => complex.acsch()).toThrowError();
  });
});