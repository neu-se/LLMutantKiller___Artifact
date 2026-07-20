import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acot", () => {
  it("should return a Complex object when called on a complex number", () => {
    const c = new Complex(1, 1);
    const result = c.acot();
    expect(result).toBeInstanceOf(Complex);
  });
});