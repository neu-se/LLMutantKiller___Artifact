import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex sech', () => {
    const complex = new Complex(1, 1);
    const result = complex.sech();
    expect(result.im).toBeCloseTo(-2 * Math.sinh(1) * Math.sin(1) / (Math.cos(2 * 1) + Math.cosh(2 * 1)), 5);
  });
});