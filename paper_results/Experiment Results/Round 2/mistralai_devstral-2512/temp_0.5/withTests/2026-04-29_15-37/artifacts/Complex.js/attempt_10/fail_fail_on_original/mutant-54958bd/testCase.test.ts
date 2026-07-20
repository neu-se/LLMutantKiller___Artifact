import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acosh()", () => {
  it("should correctly handle the acosh transformation for complex numbers with specific negative imaginary values", () => {
    const c = new Complex(1, -0.5);
    const result = c.acosh();
    // This test specifically targets the branch where res['im'] < 0 in acosh
    // The mutation changes tmp = res['re'] to tmp = res[""] which should break the transformation
    expect(result.re).toBeCloseTo(0.881373587019543);
    expect(result.im).toBeCloseTo(-0.48121182505960347);
  });
});