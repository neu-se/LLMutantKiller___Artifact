import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the power of two complex numbers', () => {
    const z1 = new Complex(0, 0);
    const z2 = new Complex(1, 0);
    const result = z1.pow(z2);
    expect(result.re).toBeCloseTo(1);
    expect(result.im).toBeCloseTo(0);
    const z3 = new Complex(0, 0);
    const z4 = new Complex(0, 0);
    z4.re = 0.5;
    const result2 = z3.pow(z4);
    expect(result2.re).toBeCloseTo(1);
    expect(result2.im).toBeCloseTo(0);
  });
});