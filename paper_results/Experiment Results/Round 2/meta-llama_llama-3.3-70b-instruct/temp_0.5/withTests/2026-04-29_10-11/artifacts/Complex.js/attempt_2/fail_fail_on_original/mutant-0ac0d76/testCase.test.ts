import { Complex } from '../../../complex.js';

describe('Complex.js', () => {
  it('should correctly calculate the natural log of a complex number', () => {
    const complex = new Complex(1, 0);
    const log = complex.log();
    expect(log.re).toBeCloseTo(0);
    expect(log.im).toBeCloseTo(0);

    const complex2 = new Complex(Math.E, 0);
    const log2 = complex2.log();
    expect(log2.re).toBeCloseTo(1);
    expect(log2.im).toBeCloseTo(0);

    const complex3 = new Complex(-1, 0);
    const log3 = complex3.log();
    expect(log3.re).toBeCloseTo(0);
    expect(log3.im).toBeCloseTo(Math.PI);
  });
});