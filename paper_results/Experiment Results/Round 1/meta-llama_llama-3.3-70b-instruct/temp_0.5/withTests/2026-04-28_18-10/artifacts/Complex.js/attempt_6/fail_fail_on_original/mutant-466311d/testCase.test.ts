import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate logHypot correctly', () => {
    const complex = new Complex(3001, 0);
    const result = complex.log();
    const expected = Math.log(3001);
    expect(result.re).toBeCloseTo(expected, 10);
  });
});