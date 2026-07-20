import { Complex } from '../../../complex';

describe('Complex', () => {
  it('should correctly calculate cosecans and fail when mutated', () => {
    const complex = new Complex(1, 1);
    const result = complex.csc();
    const denominatorOriginal = 0.5 * Math.cosh(2 * 1) - 0.5 * Math.cos(2 * 1);
    const denominatorMutated = 0.5 * Math.cosh(2 * 1) - 0.5 / Math.cos(2 * 1);
    expect(denominatorOriginal).not.toBeCloseTo(denominatorMutated, 10);
  });
});