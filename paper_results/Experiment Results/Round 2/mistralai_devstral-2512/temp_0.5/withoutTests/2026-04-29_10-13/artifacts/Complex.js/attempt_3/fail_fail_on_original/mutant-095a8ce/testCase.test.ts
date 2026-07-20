import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc", () => {
  it("should return Infinity for zero real part with non-zero imaginary part", () => {
    const result = new Complex(0, 1).acsc();
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(0);
  });
});