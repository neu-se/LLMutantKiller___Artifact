import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex subtraction with infinity", () => {
  it("should return Infinity when subtracting an infinite complex number from another infinite complex number", () => {
    const infinity = Complex.INFINITY;
    const result = infinity.sub(infinity);
    expect(result.isInfinite()).toBe(true);
  });
});