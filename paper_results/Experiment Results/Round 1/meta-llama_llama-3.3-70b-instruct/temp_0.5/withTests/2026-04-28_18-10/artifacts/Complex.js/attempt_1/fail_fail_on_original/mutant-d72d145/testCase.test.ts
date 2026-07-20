import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when acsc is called with a mutated implementation', () => {
    const complex = new Complex(1, 1);
    expect(() => complex.acsc()).toThrowError();
  });
});