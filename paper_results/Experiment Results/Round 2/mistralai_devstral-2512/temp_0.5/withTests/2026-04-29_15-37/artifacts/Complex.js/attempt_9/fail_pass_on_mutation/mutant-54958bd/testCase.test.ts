import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acosh()", () => {
  it("should correctly handle the acosh transformation for complex numbers with negative imaginary part", () => {
    const c = new Complex(0, -1);
    const result = c.acosh();
    // This test targets the specific branch where res['im'] < 0 in acosh
    // The mutation changes tmp = res['re'] to tmp = res[""] which should cause incorrect transformation
    expect(result.re).toBeCloseTo(0.881373587019543);
    expect(result.im).toBeCloseTo(-1.5707963267948966);
  });
});