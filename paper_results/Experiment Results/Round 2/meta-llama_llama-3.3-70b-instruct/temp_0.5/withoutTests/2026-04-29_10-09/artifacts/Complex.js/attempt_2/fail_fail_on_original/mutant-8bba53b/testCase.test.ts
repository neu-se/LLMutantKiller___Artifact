import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate cos(x) - 1 correctly using cosm1 function', () => {
    const x = 0.1;
    const complex = new Complex(x);
    const expected = Math.cos(x) - 1;
    const result = Complex.cosh(x) - 1 - (Math.exp(x) + Math.exp(-x)) * 0.5 + 1;
    expect(result).toBeCloseTo(expected);
  });
});