import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate logHypot correctly', () => {
    const a = 3000;
    const b = 3000;
    const complex = new Complex(a, b);
    const logHypotResult = complex.log().re;
    expect(logHypotResult).toBeCloseTo(Math.log(Math.hypot(a, b)), 10);
  });
});