import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate logHypot correctly', () => {
    const complex1 = new Complex(3000, 3000);
    const complex2 = new Complex(3001, 3000);
    const result1 = complex1.log();
    const result2 = complex2.log();
    expect(result1.re).toBeCloseTo(Math.log(Math.sqrt(3000 * 3000 + 3000 * 3000)), 3);
    expect(result2.re).toBeCloseTo(Math.log(Math.sqrt(3001 * 3001 + 3000 * 3000)), 3);
    expect(result1.re).not.toBeCloseTo(result2.re, 3);
  });
});