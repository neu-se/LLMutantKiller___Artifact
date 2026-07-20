import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should correctly calculate asech for zero real part', () => {
    const complex = new Complex(0, 1);
    const result = complex.asech();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
    const complex2 = new Complex(0, 0);
    const result2 = complex2.asech();
    expect(result2.re).toBeCloseTo(Infinity, 10);
  });
});