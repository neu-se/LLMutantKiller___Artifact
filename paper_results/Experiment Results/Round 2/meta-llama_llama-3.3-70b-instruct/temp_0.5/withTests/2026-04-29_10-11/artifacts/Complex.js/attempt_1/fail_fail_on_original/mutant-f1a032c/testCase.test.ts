import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should floor the imaginary part correctly', () => {
    const complex = new Complex(1.5, 2.7);
    const flooredComplex = complex.floor(1);
    expect(flooredComplex.im).toBe(2.7);
  });
});