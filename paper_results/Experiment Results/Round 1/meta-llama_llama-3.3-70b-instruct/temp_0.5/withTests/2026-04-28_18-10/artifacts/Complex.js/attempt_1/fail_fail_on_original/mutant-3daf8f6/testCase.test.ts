import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex.js', () => {
  it('should calculate logHypot correctly', () => {
    const a = 3000;
    const b = 3000;
    const result = Complex.logHypot(a, b);
    expect(result).toBeCloseTo(Math.log(Math.sqrt(a * a + b * b)));
  });
});