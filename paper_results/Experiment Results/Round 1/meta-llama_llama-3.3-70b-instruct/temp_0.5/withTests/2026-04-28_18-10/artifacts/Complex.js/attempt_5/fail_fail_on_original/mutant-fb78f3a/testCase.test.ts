import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should correctly handle asec for a = 0 and b = 1', () => {
    const c = new Complex(0, 1);
    const result = c.asec();
    expect(result.re).toBeCloseTo(Math.PI / 2);
    expect(result.im).toBeCloseTo(0);
  });
});