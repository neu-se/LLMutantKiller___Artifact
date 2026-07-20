import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate log correctly for zero and positive real numbers', () => {
    const complex1 = new Complex(0);
    const result1 = complex1.log();
    expect(result1.re).toBeCloseTo(-Infinity);
    expect(result1.im).toBeCloseTo(0);

    const complex2 = new Complex(1);
    const result2 = complex2.log();
    expect(result2.re).toBeCloseTo(0);
    expect(result2.im).toBeCloseTo(0);
  });
});