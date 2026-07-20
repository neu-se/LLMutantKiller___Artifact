import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate the complex sech correctly', () => {
    const complex = new Complex(0, 1);
    const result = complex.sech();
    expect(result.re).toBeCloseTo(2 * cosh(0) * Math.cos(1) / (Math.cos(2) + Math.cosh(2)), 10);
    expect(result.im).toBeCloseTo(-2 * sinh(0) * Math.sin(1) / (Math.cos(2) + Math.cosh(2)), 10);
  });
});