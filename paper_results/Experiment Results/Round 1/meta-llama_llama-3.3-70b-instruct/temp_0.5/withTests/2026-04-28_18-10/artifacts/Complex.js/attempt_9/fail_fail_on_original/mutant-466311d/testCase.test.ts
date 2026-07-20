import { Complex } from '../complex';

describe('Complex', () => {
  it('should calculate logHypot correctly', () => {
    const complex = new Complex(2999, 2999);
    const result = complex.log();
    const expected = 0.5 * Math.log(2999 * 2999 + 2999 * 2999);
    expect(result.re).toBeCloseTo(expected, 10);
  });
});