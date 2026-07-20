import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.add", () => {
  it("should return Infinity when adding a finite number to Infinity", () => {
    const finite = new Complex(5, 0);
    const infinite = Complex.INFINITY;
    const result = finite.add(infinite);
    expect(result.isInfinite()).toBe(true);
    expect(result.isNaN()).toBe(false);
  });
});