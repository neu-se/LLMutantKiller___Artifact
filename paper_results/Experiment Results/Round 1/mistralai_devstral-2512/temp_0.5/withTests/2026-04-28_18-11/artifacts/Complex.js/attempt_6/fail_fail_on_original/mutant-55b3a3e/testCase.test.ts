import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc", () => {
  it("should return Infinity for zero real and non-zero imaginary input", () => {
    const result = new Complex(0, 1).acsc();
    expect(result.isInfinite()).toBe(true);
  });
});