import { Complex } from './complex';

describe('Complex.js', () => {
  it('should correctly calculate the natural log of a complex number', () => {
    const complex = new Complex(1, 0);
    const log = complex.log();
    expect(log.re).toBeCloseTo(0);
    expect(log.im).toBeCloseTo(0);
  });
});