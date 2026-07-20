import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acosh()", () => {
  it("should correctly transform result when imaginary part is negative", () => {
    const c = new Complex(2, -1);
    const result = c.acosh();
    // This test specifically targets the branch where res['im'] < 0
    // The mutation changes tmp = res['re'] to tmp = res[""] which should cause incorrect transformation
    expect(result.re).toBeCloseTo(1.3169578969248166);
    expect(result.im).toBeCloseTo(-0.5493061443340548);
  });
});