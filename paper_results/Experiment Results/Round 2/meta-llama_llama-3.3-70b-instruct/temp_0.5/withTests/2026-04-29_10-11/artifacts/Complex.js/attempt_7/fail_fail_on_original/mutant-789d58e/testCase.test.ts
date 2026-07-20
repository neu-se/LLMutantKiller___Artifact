import { Complex } from './complex';

describe('Complex.js', () => {
  it('should calculate cosm1 correctly', () => {
    const x = 0.000001;
    const result = Complex.cosm1(x);
    const expected = Math.cos(x) - 1;
    expect(Math.abs(result - expected) < 1e-10).toBe(true);
  });
});