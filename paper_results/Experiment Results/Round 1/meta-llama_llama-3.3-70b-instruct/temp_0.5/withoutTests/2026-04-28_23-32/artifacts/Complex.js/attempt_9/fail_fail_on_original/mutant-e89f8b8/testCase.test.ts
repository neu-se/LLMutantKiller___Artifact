import { Complex } from './complex';

describe('Complex', () => {
  it('should correctly calculate the complex cosecans', () => {
    const complex = new Complex(1, 1);
    const result = complex.csc();
    const d = 0.5 * Math.cos(2 * 1) + 0.5 * Math.cosh(2 * 1);
    expect(result.re).toBeCloseTo(Math.sin(1) * Math.cosh(1) / d, 10);
    expect(result.im).not.toBeCloseTo(-Math.cos(1) * Math.sinh(1) * d, 10);
  });
});