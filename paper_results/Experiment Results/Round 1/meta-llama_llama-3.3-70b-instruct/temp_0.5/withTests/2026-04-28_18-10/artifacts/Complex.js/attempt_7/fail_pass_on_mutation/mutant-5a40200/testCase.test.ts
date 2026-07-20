import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosh correctly', () => {
    const complex = new Complex(1e-9);
    const resultOriginal = new Complex(1e-9).cosh();
    const resultMutated = (Math.exp(1e-9) + Math.exp(-1e-9)) / 2;
    expect(resultOriginal.re).not.toBeCloseTo(1 - 1e-9, 10);
    expect(resultOriginal.re).toBeCloseTo(resultMutated, 10);
  });
});