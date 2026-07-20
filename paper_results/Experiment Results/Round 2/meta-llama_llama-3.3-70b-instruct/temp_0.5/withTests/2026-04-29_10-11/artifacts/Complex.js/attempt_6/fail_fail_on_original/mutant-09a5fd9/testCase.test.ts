import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate the complex sech correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.sech();
    expect(result.re).toBeCloseTo(2 * Math.cos(0) / (Math.cos(0) + Math.cosh(2)), 10);
    expect(result.im).toBeCloseTo(-2 * Math.sin(0) / (Math.cos(0) + Math.cosh(2)), 10);
  });
});