import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate cosm1 correctly', () => {
    const x = 0.01;
    const result = Complex.cosm1(x);
    const expected = Math.cos(x) - 1;
    expect(result).toBeCloseTo(expected, 10);
  });
});