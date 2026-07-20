import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex asech for a non-zero real value when a is not zero', () => {
    const complex = new Complex(1, 0);
    const result = complex.asech();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);
  });
});