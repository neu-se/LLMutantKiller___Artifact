import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('toString should return the correct string representation of a complex number', () => {
    const complex = new Complex(1, -2);
    expect(complex.toString()).toBe('1-2i');
  });
});