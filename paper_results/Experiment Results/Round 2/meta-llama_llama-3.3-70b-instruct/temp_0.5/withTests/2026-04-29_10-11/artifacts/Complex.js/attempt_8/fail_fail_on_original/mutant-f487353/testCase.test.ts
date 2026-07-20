import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the cosecans of a complex number', () => {
    const complex = new Complex(1, 1);
    const result = complex.csc();
    expect(result.re).toBeCloseTo(Math.sin(1) * Math.cosh(1) / (Math.sin(1) * Math.cosh(1) + Math.cos(1) * Math.sinh(1)));
    expect(result.im).toBeCloseTo(-Math.cos(1) * Math.sinh(1) / (Math.sin(1) * Math.cosh(1) + Math.cos(1) * Math.sinh(1)));
  });
});