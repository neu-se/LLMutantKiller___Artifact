import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex subtraction behavior", () => {
  it("should return Infinity when subtracting finite from infinite", () => {
    const infinity = Complex.INFINITY;
    const finite = new Complex(5, 3);
    const result = infinity.sub(finite);
    expect(result.isInfinite()).toBe(true);
  });
});