import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should correctly calculate division of two complex numbers', () => {
    const a = new Complex(4, 3);
    const b = new Complex(1, 1);
    const result = a.div(b);
    expect(result.re).toBeCloseTo(3.5, 10);
    expect(result.im).toBeCloseTo(0.5, 10);
  });
});