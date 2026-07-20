import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate the cosecans of a complex number correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.csc();
    const originalDenominator = 0.5 * Math.cosh(2 * 1) - 0.5 * Math.cos(2 * 1);
    const mutatedDenominator = 0.5 * Math.cosh(2 * 1) - 0.5 / Math.cos(2 * 1);
    expect(originalDenominator).not.toBeCloseTo(mutatedDenominator, 10);
    expect(result.re).toBeCloseTo(-0.2721655262589455, 5);
    expect(result.im).toBeCloseTo(0.2721655262589455, 5);
  });
});