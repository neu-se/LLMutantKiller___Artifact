import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex asech for a non-zero real value', () => {
    const complex = new Complex(0, 0);
    const result = complex.asech();
    expect(result.re).toBeCloseTo(Infinity);
    expect(result.im).toBeCloseTo(0);
  });
});