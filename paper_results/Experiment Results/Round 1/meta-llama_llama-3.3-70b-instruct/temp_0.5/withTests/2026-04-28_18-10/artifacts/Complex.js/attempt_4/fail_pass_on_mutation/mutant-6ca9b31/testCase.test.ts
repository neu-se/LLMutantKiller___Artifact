import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should return the correct string representation of a complex number', () => {
    const complex = new Complex(0, 0);
    expect(complex.toString()).toBe('0');
  });
});