import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should return the correct result for the cosm1 function', () => {
    const x = 0.000001;
    const result = Complex.prototype.cosm1(x);
    expect(result).toBeCloseTo(-1 + Math.cos(x), 10);
  });
});