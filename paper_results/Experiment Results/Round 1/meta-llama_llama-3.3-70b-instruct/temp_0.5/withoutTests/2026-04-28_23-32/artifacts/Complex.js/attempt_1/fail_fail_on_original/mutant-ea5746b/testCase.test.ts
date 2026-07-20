import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosm1 correctly', () => {
    const x = 0.1;
    const resultOriginal = Math.cos(x) - 1;
    const resultFromComplex = Complex.cosm1(x);
    expect(Math.abs(resultOriginal - resultFromComplex) < 1e-9).toBe(true);
  });
});