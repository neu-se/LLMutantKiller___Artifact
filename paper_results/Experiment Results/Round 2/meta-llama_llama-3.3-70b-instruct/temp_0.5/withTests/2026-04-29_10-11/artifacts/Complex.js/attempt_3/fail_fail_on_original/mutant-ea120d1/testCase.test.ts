import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate logHypot correctly', () => {
    const a = 3000;
    const b = 3000;
    const complex = new Complex(a, b);
    const logHypotResult = complex.log().re;
    const expected = Math.log(Math.hypot(a, b));
    expect(logHypotResult).toBeCloseTo(expected, 10);
  });
});