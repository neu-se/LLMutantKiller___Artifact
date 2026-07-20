import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should correctly calculate atanh for real numbers with no imaginary part and correct sign', () => {
    const c = new Complex(2, 0);
    const result = c.atanh();
    const d = new Complex(-2, 0);
    const result2 = d.atanh();
    expect(result.im).toBeCloseTo(0);
    expect(result2.im).toBeCloseTo(0);
  });
});