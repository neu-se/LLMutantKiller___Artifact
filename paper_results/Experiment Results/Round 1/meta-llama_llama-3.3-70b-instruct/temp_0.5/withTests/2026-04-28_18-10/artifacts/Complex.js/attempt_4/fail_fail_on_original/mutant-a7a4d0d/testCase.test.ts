import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acosh correctly for values with negative imaginary part', () => {
    const complex = new Complex(2, -1);
    const resultOriginal = new Complex(2, -1).acosh();
    const resultMutated = new Complex(2, -1).acosh();
    expect(resultOriginal.re).not.toBeCloseTo(resultMutated.re);
    expect(resultOriginal.im).not.toBeCloseTo(resultMutated.im);
  });
});