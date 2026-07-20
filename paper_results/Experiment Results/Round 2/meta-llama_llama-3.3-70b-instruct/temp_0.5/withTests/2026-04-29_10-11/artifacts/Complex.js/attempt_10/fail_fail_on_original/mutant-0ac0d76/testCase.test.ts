import { Complex } from '../complex';

describe('Complex.js', () => {
  it('should correctly calculate the natural log of a complex number', () => {
    const complex = new Complex(2, 0);
    const log = complex.log();
    expect(log.re).toBeCloseTo(Math.log(2));
    expect(log.im).toBeCloseTo(0);
    const complex2 = new Complex(0.5, 0);
    const log2 = complex2.log();
    expect(log2.re).toBeCloseTo(Math.log(0.5));
    expect(log2.im).toBeCloseTo(0);
  });
});