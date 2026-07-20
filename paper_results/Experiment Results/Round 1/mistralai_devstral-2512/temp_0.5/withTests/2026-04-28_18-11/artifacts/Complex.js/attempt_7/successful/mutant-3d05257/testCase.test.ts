import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acosh()", () => {
  it("should correctly compute acosh for a complex number with positive imaginary part", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.acosh();
    expect(result.re).toBeCloseTo(0.5306375309525178);
    expect(result.im).toBeCloseTo(1.1185178796437059);
  });
});