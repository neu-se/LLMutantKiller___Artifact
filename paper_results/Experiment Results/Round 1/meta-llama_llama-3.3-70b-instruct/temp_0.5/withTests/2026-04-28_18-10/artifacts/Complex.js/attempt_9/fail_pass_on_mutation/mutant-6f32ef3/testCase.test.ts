import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct string representation of a complex number', () => {
    const complex = new Complex(1, -0);
    expect(complex.toString().length).toBe(1);
  });
});