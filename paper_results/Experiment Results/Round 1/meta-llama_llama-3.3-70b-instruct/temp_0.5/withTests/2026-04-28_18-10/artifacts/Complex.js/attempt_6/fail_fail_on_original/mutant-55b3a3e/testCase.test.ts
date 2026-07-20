import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should correctly calculate the complex arcus cosecans for non-zero real part and zero imaginary part', () => {
    const complex = new Complex(1, 0);
    const resultOriginal = new Complex(1, 0).acsc();
    const resultMutated = complex.acsc();
    expect(resultOriginal.re).not.toBeCloseTo(resultMutated.re);
  });
});