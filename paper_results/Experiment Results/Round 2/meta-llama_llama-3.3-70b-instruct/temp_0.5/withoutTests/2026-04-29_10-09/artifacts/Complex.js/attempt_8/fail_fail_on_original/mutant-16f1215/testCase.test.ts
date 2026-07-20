import { Complex } from "../../../complex.js";

describe('Complex', () => {
  it('should return correct result for acsc', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsc();
    expect(result.re).not.toBeNaN();
    expect(result.im).toBeCloseTo(-Math.PI / 2);
    const complex2 = new Complex(1, 0);
    const result2 = complex2.acsc();
    expect(result2.re).not.toBeNaN();
    expect(result2.im).toBeCloseTo(Math.PI / 2);
    expect(complex.acsc().re).not.toBe(complex2.acsc().re);
  });
});