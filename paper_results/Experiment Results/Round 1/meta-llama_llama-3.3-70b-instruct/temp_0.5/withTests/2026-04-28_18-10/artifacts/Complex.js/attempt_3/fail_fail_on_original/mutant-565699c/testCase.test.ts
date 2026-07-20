import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should return the correct result for the cosm1 function', () => {
    const x = 0.000001;
    const result = Complex.prototype.cosm1(x);
    const expected = Math.cos(x) - 1;
    expect(result).toBeCloseTo(expected, 10);
  });
});