import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acosh()", () => {
  it("should correctly handle the acosh transformation for complex numbers with specific values", () => {
    const c = new Complex(0, 2);
    const result = c.acosh();
    // This test targets the specific transformation logic in acosh
    // where tmp = res['re'] is used when res['im'] < 0
    expect(result.re).toBeCloseTo(1.3169578969248166);
    expect(result.im).toBeCloseTo(1.5707963267948966);
  });
});