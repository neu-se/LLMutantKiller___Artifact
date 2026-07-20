import { Complex } from '../../../complex.js';

describe('Complex.js', () => {
  it('should calculate cosm1 correctly', () => {
    const x = 0.1;
    const result = Complex.cosm1(x);
    const expected = Math.cos(x) - 1;
    expect(Math.abs(result - expected) < 1e-10).toBe(true);
    const mutatedResult = Complex.cosm1(x);
    const mutatedExpected = Math.cos(x) - 1 * 3628800;
    expect(Math.abs(mutatedResult - mutatedExpected) < 1e-10).not.toBe(true);
  });
});