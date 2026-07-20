import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate logHypot correctly', () => {
    const complex = new Complex(3001, 3001);
    const result = complex.log();
    expect(result.re).toBeCloseTo(Math.log(Math.sqrt(3001 * 3001 + 3001 * 3001)), 10);
  });
});