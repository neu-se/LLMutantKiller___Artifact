import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex asech', () => {
    const complex = new Complex(0, 0);
    const result = complex.asech();
    expect(result.re).toBeCloseTo(Infinity);
    expect(result.im).toBeCloseTo(0);
    const complex2 = new Complex(1, 0);
    const result2 = complex2.asech();
    expect(result2.re).toBeCloseTo(0);
    expect(result2.im).toBeCloseTo(0);
  });
});