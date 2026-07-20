import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acot()", () => {
  it("should return correct imaginary part for positive imaginary input", () => {
    const c = new Complex(0, 1);
    const result = c.acot();
    expect(result.im).toBe(Infinity);
  });
});