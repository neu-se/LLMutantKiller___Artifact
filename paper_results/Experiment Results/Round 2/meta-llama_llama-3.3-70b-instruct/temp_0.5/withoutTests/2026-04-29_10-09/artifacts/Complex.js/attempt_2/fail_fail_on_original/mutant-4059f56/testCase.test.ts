import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should clone the complex number correctly', () => {
    const complex = new Complex(1, 2);
    const clonedComplex = complex.clone();
    expect(clonedComplex.re).toBe(1);
    expect(clonedComplex.im).toBe(2);
  });
});