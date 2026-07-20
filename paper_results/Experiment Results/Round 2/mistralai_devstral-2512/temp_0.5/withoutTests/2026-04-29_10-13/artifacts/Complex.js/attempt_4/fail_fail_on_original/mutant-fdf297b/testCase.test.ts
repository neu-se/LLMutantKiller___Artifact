import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex subtraction with infinity", () => {
  it("should return NaN when subtracting an infinite complex number from a finite number", () => {
    const finite = new Complex(5, 3);
    const infinity = Complex.INFINITY;
    const result = finite.sub(infinity);
    expect(result.isNaN()).toBe(true);
  });
});