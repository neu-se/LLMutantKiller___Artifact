import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex subtraction with infinity", () => {
  it("should return a valid Complex object when subtracting two infinite complex numbers", () => {
    const infinity = Complex.INFINITY;
    const result = infinity.sub(infinity);
    expect(result instanceof Complex).toBe(true);
    expect(result.isNaN()).toBe(true);
  });
});