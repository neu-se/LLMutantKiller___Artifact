import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should return the correct result for acoth', () => {
    const complex = new Complex(0, 1);
    const result = complex.acoth();
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
    const complex2 = new Complex(0, -1);
    const result2 = complex2.acoth();
    expect(result2.im).toBeCloseTo(-Math.PI / 2, 10);
    expect(result.im).not.toBeCloseTo(result2.im, 10);
  });
});