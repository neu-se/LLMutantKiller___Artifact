import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should multiply two complex numbers correctly when both are real', () => {
    const c1 = new Complex(2, 0);
    const c2 = new Complex(3, 0);
    const result = c1.mul(c2);
    expect(result.re).toBeCloseTo(6);
    expect(result.im).toBeCloseTo(0);
    const c3 = new Complex(0, 0);
    const c4 = new Complex(0, 0);
    const result2 = c3.mul(c4);
    expect(result2.re).toBeCloseTo(0);
    expect(result2.im).toBeCloseTo(0);
    expect(c1.mul(c2).re).not.toBeNaN();
  });
});