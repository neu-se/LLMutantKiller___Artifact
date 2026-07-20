import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate logHypot correctly', () => {
    const a = 2999;
    const b = 2999;
    const complex = new Complex(a, b);
    const logHypotResult = complex.log().re;
    const expected = Math.log(a * a + b * b) * 0.5;
    expect(logHypotResult).toBeCloseTo(expected, 10);
  });
});