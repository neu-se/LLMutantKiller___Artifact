import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex subtraction with infinity", () => {
  it("should return Complex.NAN when subtracting two infinite complex numbers", () => {
    const infinity = Complex.INFINITY;
    const result = infinity.sub(infinity);
    expect(result).toEqual(Complex.NAN);
    expect(result).not.toEqual(Complex.INFINITY);
  });
});