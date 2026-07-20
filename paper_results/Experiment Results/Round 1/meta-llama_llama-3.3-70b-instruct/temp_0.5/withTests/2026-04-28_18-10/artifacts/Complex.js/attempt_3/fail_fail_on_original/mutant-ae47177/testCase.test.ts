import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should return correct result for atan function when a is 0 and b is 1 or -1', () => {
    const complex1 = new Complex(0, 1);
    const result1 = complex1.atan();
    expect(result1.re).toBeCloseTo(0);
    expect(result1.im).toBeCloseTo(Infinity);

    const complex2 = new Complex(0, -1);
    const result2 = complex2.atan();
    expect(result2.re).toBeCloseTo(0);
    expect(result2.im).toBeCloseTo(-Infinity);
  });
});