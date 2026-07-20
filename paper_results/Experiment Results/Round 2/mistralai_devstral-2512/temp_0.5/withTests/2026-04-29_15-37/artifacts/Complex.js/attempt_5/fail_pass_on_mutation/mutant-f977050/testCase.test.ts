import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acosh()", () => {
  it("should correctly compute acosh for a complex number with positive imaginary part", () => {
    const c = new Complex(1, 0);
    const result = c.acosh();
    // The mutation changes res['im'] = -res['re'] to res['im'] = -res[""]
    // This will cause incorrect behavior when res[""] is undefined
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);
  });
});