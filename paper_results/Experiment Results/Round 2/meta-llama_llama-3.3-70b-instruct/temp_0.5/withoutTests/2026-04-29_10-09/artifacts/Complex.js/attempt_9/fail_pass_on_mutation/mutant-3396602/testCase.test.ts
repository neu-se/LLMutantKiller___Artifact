import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate csc correctly', () => {
    const complex = new Complex(Math.PI / 4, 1);
    const resultOriginal = complex.csc();
    const complexMutated = new Complex(Math.PI / 4, 1);
    complexMutated.re = Math.PI / 4;
    complexMutated.im = 1;
    const resultMutated = complexMutated.csc();
    expect(resultOriginal.re).not.toBeCloseTo(resultMutated.re / Math.cos(Math.PI / 2));
  });
});