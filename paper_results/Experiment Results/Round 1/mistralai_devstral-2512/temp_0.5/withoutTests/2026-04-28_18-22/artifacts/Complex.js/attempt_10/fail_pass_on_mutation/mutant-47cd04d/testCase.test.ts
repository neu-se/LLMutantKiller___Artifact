import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.add", () => {
  it("should return Infinity when adding a finite complex number to Infinity", () => {
    const finite = new Complex(2, 3);
    const result = finite.add(Complex.INFINITY);
    expect(result.isInfinite()).toBe(true);
    expect(result.isNaN()).toBe(false);
  });
});