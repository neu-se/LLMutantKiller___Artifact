import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.add", () => {
  it("should correctly handle addition with Infinity", () => {
    const finite = new Complex(1, 1);
    const infinite = Complex.INFINITY;
    const result = infinite.add(finite);
    expect(result.isInfinite()).toBe(true);
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(Infinity);
    expect(result).toBe(Complex.INFINITY);
  });
});