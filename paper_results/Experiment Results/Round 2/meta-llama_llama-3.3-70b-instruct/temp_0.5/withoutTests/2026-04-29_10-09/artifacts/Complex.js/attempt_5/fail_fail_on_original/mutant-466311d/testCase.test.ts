import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate logHypot correctly', () => {
    const complex = new Complex(1000, 1000);
    const result = complex.log();
    const expected = new Complex(Math.log(Math.sqrt(1000 * 1000 + 1000 * 1000)) / 2, Math.atan2(1000, 1000));
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});