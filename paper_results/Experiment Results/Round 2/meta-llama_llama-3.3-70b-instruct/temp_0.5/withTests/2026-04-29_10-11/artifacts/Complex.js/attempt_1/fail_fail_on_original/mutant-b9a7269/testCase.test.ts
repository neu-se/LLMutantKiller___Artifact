import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly floor the complex number', () => {
    const complex = new Complex(1.234, 5.678);
    const flooredComplex = complex.floor(2);
    expect(flooredComplex.re).toBeCloseTo(1.23);
    expect(flooredComplex.im).toBeCloseTo(5.68);
  });
});