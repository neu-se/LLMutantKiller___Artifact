import { Complex } from '../../../../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should correctly calculate the power of two complex numbers', () => {
    const z = new Complex(1, 0);
    const result = z.pow(1, 0);
    expect(result.re).toBeCloseTo(1, 10);
    expect(result.im).toBeCloseTo(0, 10);
    const z2 = new Complex(1, 1);
    const result2 = z2.pow(0, 0);
    expect(result2.re).toBeCloseTo(1, 10);
    expect(result2.im).toBeCloseTo(0, 10);
  });
});