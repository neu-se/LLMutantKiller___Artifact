import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosm1 correctly', () => {
    const x = 0.01;
    const resultOriginal = Complex.cosm1(x);
    expect(resultOriginal).toBeCloseTo(Math.cos(x) - 1, 9);
  });
});