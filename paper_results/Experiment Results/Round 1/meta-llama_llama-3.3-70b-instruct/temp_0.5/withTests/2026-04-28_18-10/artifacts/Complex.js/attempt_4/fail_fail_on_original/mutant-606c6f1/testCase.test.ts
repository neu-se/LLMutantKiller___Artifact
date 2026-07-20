import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return Infinity when adding Infinity to any complex number', () => {
    const infinity = new Complex(Infinity, 0);
    const complex = new Complex(1, 2);
    const resultOriginal = new Complex(Infinity, 0).add(complex);
    expect(resultOriginal.toString()).toBe('Infinity');
  });

  it('should return a value that is not Infinity when adding two complex numbers without Infinity', () => {
    const complex1 = new Complex(1, 2);
    const complex2 = new Complex(3, 4);
    const resultMutated = complex1.add(complex2);
    expect(resultMutated.toString()).not.toBe('Infinity');
  });
});