import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should calculate the complex exponential correctly', () => {
    const complex = new Complex(1, 2);
    const exp = complex.exp();
    expect(exp.re).toBeCloseTo(Math.exp(1) * Math.cos(2), 1e-10);
    expect(exp.im).toBeCloseTo(Math.exp(1) * Math.sin(2), 1e-10);
  });
});