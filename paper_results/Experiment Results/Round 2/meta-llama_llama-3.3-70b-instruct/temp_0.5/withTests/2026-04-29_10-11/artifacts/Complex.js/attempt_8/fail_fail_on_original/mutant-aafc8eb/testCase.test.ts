import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate cosm1 correctly for a specific angle', () => {
    const angle = 0.1;
    const result = Complex.cosm1(angle);
    const expected = Math.cos(angle) - 1;
    expect(result).toBeCloseTo(expected, 10);
  });
});