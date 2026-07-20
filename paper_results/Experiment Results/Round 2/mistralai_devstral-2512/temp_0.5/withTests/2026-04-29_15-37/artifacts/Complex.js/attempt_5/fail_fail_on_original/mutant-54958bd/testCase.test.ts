import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acosh()", () => {
  it("should correctly handle the acosh transformation for complex numbers with negative imaginary part", () => {
    const c = new Complex(1, -1);
    const result = c.acosh();
    // This test targets the specific branch where res['im'] < 0 in acosh
    // The mutation changes tmp = res['re'] to tmp = res[""] which should break this transformation
    expect(result.re).toBeCloseTo(1.0612750619050355);
    expect(result.im).toBeCloseTo(-0.9624236501192069);
  });
});