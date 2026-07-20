import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when attempting to calculate asech with a division by zero in the mutated code', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.asech()).toThrow();
  });
});