import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate logHypot correctly', () => {
    const complex1 = new Complex(3000, 3000);
    const complex2 = new Complex(3000, 3001);
    const result1 = complex1.log();
    const result2 = complex2.log();
    expect(result1.re).toBeCloseTo(result2.re, 3);
  });
});