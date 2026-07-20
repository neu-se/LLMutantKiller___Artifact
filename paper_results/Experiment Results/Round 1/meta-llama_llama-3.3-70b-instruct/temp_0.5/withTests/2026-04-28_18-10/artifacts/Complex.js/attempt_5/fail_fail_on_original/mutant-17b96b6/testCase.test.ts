import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when acoth is called with a = 0 and b = 0 in the original code, but not in the mutated code', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.acoth()).toThrowError();
  });
});