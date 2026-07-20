import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex exponent when imaginary part is zero', () => {
    const complex = new Complex(1, 0);
    const exp = complex.exp();
    expect(exp.re).toBeCloseTo(Math.E, 10);
    expect(exp.im).toBeCloseTo(0, 10);
  });
});