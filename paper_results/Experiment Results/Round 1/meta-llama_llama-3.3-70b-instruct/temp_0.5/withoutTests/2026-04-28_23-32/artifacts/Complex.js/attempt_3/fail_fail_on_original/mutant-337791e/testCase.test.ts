import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex exponent', () => {
    const complex = new Complex(1, 0);
    const exp = complex.exp();
    expect(exp.re).toBeCloseTo(Math.E, 10);
    expect(exp.im).toBeCloseTo(0, 10);
  });
});