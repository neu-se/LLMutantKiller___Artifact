import { Complex } from "../../../complex.js";

describe('Complex', () => {
  it('should return correct result for acsc', () => {
    const complex = new Complex(1, 0);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(Math.PI / 2);
    const complex2 = new Complex(0, 0);
    expect(() => complex2.acsc()).not.toThrow();
  });
});