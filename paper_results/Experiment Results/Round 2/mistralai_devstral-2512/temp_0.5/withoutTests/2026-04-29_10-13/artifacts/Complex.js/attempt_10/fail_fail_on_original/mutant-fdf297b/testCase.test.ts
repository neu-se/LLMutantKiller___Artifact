import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex subtraction with infinity", () => {
  it("should return NaN when subtracting finite from infinite complex number", () => {
    const infinite = Complex.INFINITY;
    const finite = new Complex(1, 1);
    const result = infinite.sub(finite);
    expect(result.isNaN()).toBe(true);
  });
});