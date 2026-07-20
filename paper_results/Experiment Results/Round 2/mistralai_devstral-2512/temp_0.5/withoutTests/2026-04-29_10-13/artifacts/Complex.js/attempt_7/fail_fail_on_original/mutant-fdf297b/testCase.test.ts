import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex subtraction with infinity", () => {
  it("should return NaN when subtracting infinite from finite complex number", () => {
    const finite = new Complex(1, 1);
    const infinite = Complex.INFINITY;
    const result = finite.sub(infinite);
    expect(result.isNaN()).toBe(true);
  });
});