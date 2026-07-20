import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acosh()", () => {
  it("should correctly compute acosh for a complex number with positive imaginary part", () => {
    const c = new Complex(1, 2);
    const result = c.acosh();
    expect(result.re).toBeCloseTo(1.5285709194809975);
    expect(result.im).toBeCloseTo(1.1437177404024206);
  });
});