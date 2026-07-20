import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should return the correct result for acsch', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
    const complex2 = new Complex(0, 0);
    const result2 = complex2.acsch();
    expect(result2.re).toBeCloseTo(Infinity, 10);
    expect(result2.im).toBeCloseTo(0, 10);
  });
});