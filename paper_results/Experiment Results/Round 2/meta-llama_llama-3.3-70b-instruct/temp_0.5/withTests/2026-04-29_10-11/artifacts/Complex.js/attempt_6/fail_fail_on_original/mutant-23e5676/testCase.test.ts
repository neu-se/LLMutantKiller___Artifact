import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should correctly calculate acsc for a complex number', () => {
    const complex = new Complex(2, 1);
    const resultOriginal = new Complex(2, 1).acsc();
    expect(resultOriginal.re).not.toBeNaN();
    expect(resultOriginal.im).not.toBeNaN();
    const resultMutated = new Complex(2, 1).acsc();
    expect(resultMutated.re).not.toBeNaN();
    expect(resultMutated.im).not.toBeNaN();
    expect(resultOriginal.re).not.toEqual(resultMutated.re);
  });
});