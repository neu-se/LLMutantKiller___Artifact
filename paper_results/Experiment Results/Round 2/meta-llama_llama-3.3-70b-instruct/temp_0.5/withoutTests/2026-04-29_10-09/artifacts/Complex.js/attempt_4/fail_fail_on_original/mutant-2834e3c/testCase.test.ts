import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when calculating asech with b = 0 in mutated code', () => {
    const complex = new Complex(0.5, 0);
    expect(() => complex.asech()).toThrowError();
  });
});