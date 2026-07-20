import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex subtraction edge cases", () => {
  it("should return NaN when subtracting two infinite complex numbers", () => {
    const infinity1 = Complex.INFINITY;
    const infinity2 = Complex.INFINITY;
    const result = infinity1.sub(infinity2);
    expect(result.isNaN()).toBe(true);
  });
});