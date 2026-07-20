import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acosh()", () => {
  it("should correctly compute acosh for a complex number with positive imaginary part", () => {
    const c = new Complex(2, 1);
    const result = c.acosh();
    // The mutation changes res['im'] = -res['re'] to res['im'] = -res[""]
    // This will cause incorrect behavior when res[""] is undefined
    expect(result.re).toBeCloseTo(1.4436354751788103);
    expect(result.im).toBeCloseTo(-1.0001435424737974);
  });
});