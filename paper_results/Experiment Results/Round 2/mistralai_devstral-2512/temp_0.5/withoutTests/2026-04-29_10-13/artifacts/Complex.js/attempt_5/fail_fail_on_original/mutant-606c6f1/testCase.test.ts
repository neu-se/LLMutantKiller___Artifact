import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.add", () => {
  it("should return the correct result when adding a finite complex number to Infinity", () => {
    const finite = new Complex(1, 1);
    const infinite = Complex.INFINITY;
    const result = infinite.add(finite);
    expect(result.isInfinite()).toBe(true);
    expect(result.equals(Complex.INFINITY)).toBe(true);
  });
});