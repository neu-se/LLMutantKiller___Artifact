import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should calculate logHypot correctly', () => {
    const complex = new Complex(3001, 3001);
    const result = complex.log();
    const expected = 0.5 * Math.log(3001 * 3001 + 3001 * 3001);
    expect(result.re).toBeCloseTo(expected, 10);
  });
});