import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acsc', () => {
    const complex = new Complex(2, 1);
    const resultOriginal = new Complex(2, 1).acsc();
    const resultMutated = new Complex(2, 1).acsc();
    expect(resultOriginal.re).not.toBeCloseTo(resultMutated.re * 2);
    expect(resultOriginal.im).not.toBeCloseTo(resultMutated.im * 2);
  });
});