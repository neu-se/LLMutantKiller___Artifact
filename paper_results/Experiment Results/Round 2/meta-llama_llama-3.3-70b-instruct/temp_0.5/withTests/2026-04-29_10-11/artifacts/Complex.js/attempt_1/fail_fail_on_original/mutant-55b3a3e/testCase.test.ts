import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex.js', () => {
  it('should correctly handle the acsc function', () => {
    const complex = new Complex(0, 0);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
    expect(result.im).toBeCloseTo(Infinity, 10);
  });
});