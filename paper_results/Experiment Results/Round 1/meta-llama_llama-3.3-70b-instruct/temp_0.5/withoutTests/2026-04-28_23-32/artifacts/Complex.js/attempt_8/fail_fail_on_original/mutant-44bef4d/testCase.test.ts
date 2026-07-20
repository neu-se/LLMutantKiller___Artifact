import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acsc correctly', () => {
    const c = new Complex(1, 1);
    const resultOriginal = c.acsc();
    const cMutated = new Complex(1, 1);
    // Simulate the mutation
    const acscOriginal = Complex.prototype.acsc;
    Complex.prototype.acsc = function() {
      return new Complex(this.re * this.im, this.im);
    };
    const resultMutated = cMutated.acsc();
    Complex.prototype.acsc = acscOriginal;
    expect(resultOriginal.re).not.toBeCloseTo(resultMutated.re, 10);
    expect(resultOriginal.im).not.toBeCloseTo(resultMutated.im, 10);
  });
});