import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate logHypot correctly', () => {
    const a = 3000;
    const b = 3000;
    const complex1 = new Complex(a, b - 1);
    const logHypotResult1 = complex1.log().re;
    const complex2 = new Complex(a, b);
    const logHypotResult2 = complex2.log().re;
    expect(logHypotResult1).toBeCloseTo(logHypotResult2, 10);
  });
});