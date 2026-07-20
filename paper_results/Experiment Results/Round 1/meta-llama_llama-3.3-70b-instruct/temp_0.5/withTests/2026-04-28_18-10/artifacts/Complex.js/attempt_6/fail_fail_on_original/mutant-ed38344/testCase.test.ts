import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should return NaN when subtracting two infinite complex numbers with the same sign', () => {
    const c1 = new Complex('Infinity');
    const c2 = new Complex('Infinity');
    const result = c1.sub(c2);
    expect(result.equals(Complex['NAN'])).toBe(true);
  });

  // it('should return Infinity when subtracting two infinite complex numbers with different signs', () => {
  //   const c1 = new Complex('Infinity');
  //   const c2 = new Complex('-Infinity');
  //   const result = c1.sub(c2);
  //   expect(result.isInfinite()).toBe(true);
  // });
});