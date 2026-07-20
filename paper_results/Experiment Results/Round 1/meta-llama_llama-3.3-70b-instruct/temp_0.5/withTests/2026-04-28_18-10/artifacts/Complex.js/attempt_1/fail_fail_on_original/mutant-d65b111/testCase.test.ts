import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when calculating asech with mutated code', () => {
    const complex = new Complex(1, 0);
    expect(() => complex.asech()).toThrow();
  });
});