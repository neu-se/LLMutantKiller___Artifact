import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus cosecans for a = 0 and b = 0', () => {
    const complex = new Complex(0, 0);
    const resultOriginal = new Complex(0, 0).acsc();
    const resultMutated = complex.acsc();
    expect(resultOriginal.re).toBeCloseTo(Math.PI / 2, 10);
    expect(resultOriginal.im).toBeCloseTo(Infinity, 10);
    expect(resultMutated.re).not.toBeCloseTo(Math.PI / 2, 10);
    expect(resultMutated.im).not.toBeCloseTo(Infinity, 10);
  });
});