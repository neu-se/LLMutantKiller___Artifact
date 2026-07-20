import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should create a new complex number with default values when no arguments are provided', () => {
    const complex = new Complex();
    expect(complex.re).toBe(0);
    expect(complex.im).toBe(0);
  });
});