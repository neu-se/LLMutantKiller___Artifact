import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus cosecans', () => {
    const z = new Complex(2, 1);
    const resultOriginal = new Complex(2, 1).acsc();
    const resultMutated = new Complex(2, 1).acsc();
    expect(resultOriginal.re).not.toBeCloseTo(resultMutated.re, 5);
  });
});