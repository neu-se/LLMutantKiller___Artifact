import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate logHypot correctly', () => {
    const complex = new Complex(3000, 3000);
    const result = complex.log();
    expect(result.re).toBeCloseTo(0.5 * Math.log(3000 * 3000 + 3000 * 3000), 3);
  });
});