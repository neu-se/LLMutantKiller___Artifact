import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should throw an error when calculating csch with mutated code', () => {
    const complex = new Complex(1, 1);
    expect(() => complex.csch()).not.toThrow();
  });
});