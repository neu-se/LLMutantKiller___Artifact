import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.add", () => {
  it("should return Infinity when adding a finite and an infinite complex number", () => {
    const finite = new Complex(1, 2);
    const infinite = Complex.INFINITY;
    const result = finite.add(infinite);
    expect(result.isInfinite()).toBe(true);
  });
});