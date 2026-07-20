import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate log correctly for positive real numbers', () => {
    const complex = new Complex(0.000001);
    const result = complex.log();
    expect(result.re).toBeCloseTo(Math.log(0.000001));
    expect(result.im).toBeCloseTo(0);
  });
});