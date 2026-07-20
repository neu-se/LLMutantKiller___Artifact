import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should correctly handle zero imaginary part when real part is zero", () => {
    const c = new Complex(0, 0);
    const result = c.acsch();
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(0);
  });
});