import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acoth', () => {
    const complex = new Complex(1, 1);
    const resultOriginal = new Complex(1, 1).acoth();
    const resultMutated = complex.acoth();
    expect(resultOriginal.re).not.toBeCloseTo(resultMutated.re);
  });
});