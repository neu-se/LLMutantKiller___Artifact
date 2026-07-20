import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate logHypot correctly', () => {
    const complex = new Complex(3000, 3000);
    const result = complex.log();
    expect(result.re).toBeCloseTo(7.824, 3);
  });
});