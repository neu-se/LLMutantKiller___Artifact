import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should correctly calculate the complex cosecans', () => {
    const complex = new Complex(1, 1);
    const result = complex.csc();
    expect(result.re).not.toBeCloseTo(-0.21723362801966385 * (0.5 * Math.cos(2 * 1) + 0.5 * Math.cosh(2 * 1)), 10);
    expect(result.im).not.toBeCloseTo(-0.21723362801966385 * (0.5 * Math.cos(2 * 1) + 0.5 * Math.cosh(2 * 1)), 10);
  });
});