import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate acoth for complex numbers', () => {
    const complex = new Complex(1, 1);
    const resultOriginal = new Complex(1, 1).acoth();
    const resultMutated = complex.acoth();
    expect(resultOriginal.re).not.toBe(resultMutated.re);
  });
});