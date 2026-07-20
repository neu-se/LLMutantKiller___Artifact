import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly calculate cosecans and fail when mutated', () => {
    const complex = new Complex(1, 1);
    const result = complex.csc();
    const expectedDenominator = 0.5 * Math.cosh(2 * 1) - 0.5 * Math.cos(2 * 1);
    const actualDenominator = result.re * Math.cos(1) * Math.sinh(1) + result.im * Math.sin(1) * Math.cosh(1);
    expect(actualDenominator).toBeCloseTo(expectedDenominator, 10);
  });
});