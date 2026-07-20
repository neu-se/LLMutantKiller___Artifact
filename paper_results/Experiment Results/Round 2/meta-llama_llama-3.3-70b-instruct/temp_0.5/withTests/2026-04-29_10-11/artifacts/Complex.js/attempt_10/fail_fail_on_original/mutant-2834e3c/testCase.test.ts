import { Complex } from '../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should correctly calculate asech for a complex number', () => {
    const complex = new Complex(1, 1);
    const result = complex.asech();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    const b = complex.im;
    expect(b).not.toBe(0);
    const mutatedComplex = new Complex(complex.re, 0);
    const mutatedResult = mutatedComplex.asech();
    expect(mutatedResult.im).not.toEqual(result.im);
  });
});