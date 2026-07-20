import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate logHypot correctly', () => {
    const complex = new Complex(3001, 0);
    const result = complex.log();
    const expected = Math.log(Math.sqrt(3001 * 3001));
    expect(result.re).toBeCloseTo(expected, 10);
  });
});