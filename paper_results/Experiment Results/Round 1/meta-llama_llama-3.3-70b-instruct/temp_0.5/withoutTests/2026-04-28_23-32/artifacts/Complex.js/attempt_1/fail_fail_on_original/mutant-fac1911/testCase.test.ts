import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate acsch for non-zero complex numbers', () => {
    const complex = new Complex(1, 2);
    const acsch = complex.acsch();
    expect(acsch.re).toBeCloseTo(-0.096, 3);
    expect(acsch.im).toBeCloseTo(-0.035, 3);
  });
});