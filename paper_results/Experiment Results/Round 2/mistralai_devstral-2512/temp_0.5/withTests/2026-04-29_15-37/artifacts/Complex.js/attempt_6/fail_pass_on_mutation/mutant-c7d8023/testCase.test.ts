import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should return Infinity for zero imaginary part when real part is zero", () => {
    const c = new Complex(0, 0);
    const result = c.acsch();
    expect(result.isInfinite()).toBe(true);
  });
});