import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acoth', () => {
    const complex = new Complex(1, 2);
    const resultOriginal = new Complex(1, -2).acoth();
    const resultMutated = complex.acoth();
    expect(resultOriginal.re).not.toBeCloseTo(resultMutated.re, 5);
    expect(resultOriginal.im).not.toBeCloseTo(resultMutated.im, 5);
  });
});