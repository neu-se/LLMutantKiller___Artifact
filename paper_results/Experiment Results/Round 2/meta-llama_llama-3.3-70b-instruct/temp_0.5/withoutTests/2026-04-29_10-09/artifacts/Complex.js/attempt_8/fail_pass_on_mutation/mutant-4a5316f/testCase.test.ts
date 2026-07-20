import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acoth correctly', () => {
    const complex = new Complex(0, 1);
    const resultOriginal = complex.acoth();
    const complexMutated = new Complex(0, -1);
    const resultMutated = complexMutated.acoth();
    expect(resultOriginal.im).not.toBeCloseTo(resultMutated.im, 10);
  });
});