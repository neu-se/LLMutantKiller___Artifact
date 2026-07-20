import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex exponent', () => {
    const complex = new Complex(0, Math.PI);
    const exp = complex.exp();
    expect(exp.re).toBeCloseTo(-1, 10);
    expect(exp.im).toBeCloseTo(0, 10);
  });
});