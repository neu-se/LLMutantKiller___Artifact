import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly handle isZero', () => {
    const complex = new Complex(0, 0);
    expect(complex.isZero()).toBe(true);
    const infinity = new Complex(Infinity, 0);
    const zero = new Complex(0, 0);
    const result = infinity.mul(zero, 0);
    expect(result.isNaN()).toBe(true);
    expect(infinity.isInfinite()).toBe(true);
    expect(zero.isZero()).toBe(true);
  });
});