import { Complex } from '../complex';

describe('Complex', () => {
  it('should calculate the complex secant correctly for a specific input', () => {
    const complex = new Complex(1, 2);
    const result = complex.sec();
    const expectedRe = Math.cos(1) * cosh(2) / (0.5 * cosh(4) + 0.5 * Math.cos(2));
    const expectedIm = Math.sin(1) * sinh(2) / (0.5 * cosh(4) + 0.5 * Math.cos(2));
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});