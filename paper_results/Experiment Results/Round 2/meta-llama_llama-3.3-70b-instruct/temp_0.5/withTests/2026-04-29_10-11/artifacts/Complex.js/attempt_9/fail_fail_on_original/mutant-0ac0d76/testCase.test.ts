import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should correctly calculate the natural log of a complex number', () => {
    const complex = new Complex(2, 0);
    const log = complex.log();
    expect(log.re).toBeCloseTo(Math.log(2));
    expect(log.im).toBeCloseTo(0);
  });
});