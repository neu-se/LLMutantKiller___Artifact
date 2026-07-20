import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate logHypot correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.log();
    expect(result.re).toBeCloseTo(0.5 * Math.log(2), 3);
  });
});