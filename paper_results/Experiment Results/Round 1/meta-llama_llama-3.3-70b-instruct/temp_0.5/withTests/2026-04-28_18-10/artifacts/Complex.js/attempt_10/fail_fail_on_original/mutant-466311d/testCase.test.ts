import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate logHypot correctly', () => {
    const complex = new Complex(3000, 3000);
    const result = complex.log();
    const expected = 0.5 * Math.log(3000 * 3000 + 3000 * 3000) + Math.LN2;
    expect(result.re).toBeCloseTo(expected, 10);
  });
});