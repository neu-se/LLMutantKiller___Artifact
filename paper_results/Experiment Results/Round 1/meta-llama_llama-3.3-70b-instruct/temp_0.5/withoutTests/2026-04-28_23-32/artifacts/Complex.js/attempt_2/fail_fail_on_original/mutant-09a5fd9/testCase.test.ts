import { Complex } from "../../../../../complex.js";

describe('Complex', () => {
  it('should calculate the complex sech correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.sech();
    const expected = new Complex(2 * Math.cosh(1) * Math.cos(1) / (Math.cos(2) + Math.cosh(2)), -2 * Math.sinh(1) * Math.sin(1) / (Math.cos(2) + Math.cosh(2)));
    expect(result.re).toBeCloseTo(expected.re);
    expect(result.im).toBeCloseTo(expected.im);
  });
});