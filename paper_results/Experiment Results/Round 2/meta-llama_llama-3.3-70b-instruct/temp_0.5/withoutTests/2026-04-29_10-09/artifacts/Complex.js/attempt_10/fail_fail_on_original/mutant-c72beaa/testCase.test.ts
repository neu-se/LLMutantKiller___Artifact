import { Complex } from '../../../../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should correctly calculate acot for a complex number with a real part of 1 and an imaginary part of 0', () => {
    const complex = new Complex(1, 0);
    const result = complex.acot();
    expect(result.re).toBeCloseTo(0.7853981633974483, 10);
    expect(result.im).toBeCloseTo(0, 10);
    const complex2 = new Complex(0, 1);
    const result2 = complex2.acot();
    expect(result2.re).toBeCloseTo(-0.7853981633974483, 10);
    expect(result2.im).toBeCloseTo(0, 10);
  });
});