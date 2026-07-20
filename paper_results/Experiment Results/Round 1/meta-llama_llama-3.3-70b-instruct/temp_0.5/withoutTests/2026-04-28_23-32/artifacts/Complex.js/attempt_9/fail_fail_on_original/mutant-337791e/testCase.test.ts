import { Complex } from "../../../../../../complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex exponent when imaginary part is zero', () => {
    const complex = new Complex(0, 0);
    const exp = complex.exp();
    expect(exp.re).toBeCloseTo(1, 10);
    expect(exp.im).toBeCloseTo(0, 10);
    const complex2 = new Complex(1, 0);
    const exp2 = complex2.exp();
    expect(exp2.re).toBeCloseTo(Math.E, 10);
    expect(exp2.im).toBeCloseTo(0, 10);
  });
});