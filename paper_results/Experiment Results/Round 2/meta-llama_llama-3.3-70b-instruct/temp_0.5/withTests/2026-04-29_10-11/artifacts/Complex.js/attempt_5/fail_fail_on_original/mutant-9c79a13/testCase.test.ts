import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should correctly calculate the complex sech for the original code and fail for the mutated code', () => {
    const complex = new Complex(1, 1);
    const result = complex.sech();
    expect(result.re).toBeCloseTo(2 * Math.cosh(1) * Math.cos(1) / (Math.cos(2 * 1) + Math.cosh(2 * 1)));
    expect(result.im).toBeCloseTo(-2 * Math.sinh(1) * Math.sin(1) / (Math.cos(2 * 1) + Math.cosh(2 * 1)));
    // Additional assertion to make the test fail on the mutated code
    expect(result.re).not.toBeCloseTo(2 * Math.cosh(1) / (Math.cos(1) * (Math.cos(2 * 1) + Math.cosh(2 * 1))));
  });
});