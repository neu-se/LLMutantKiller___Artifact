import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acosh()", () => {
  it("should correctly transform the result when imaginary part is positive", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.acosh();
    // This test specifically targets the transformation logic in acosh
    // where tmp = res['re'] is used in the original code
    expect(result.re).toBeCloseTo(0.881373587019543);
    expect(result.im).toBeCloseTo(0.48121182505960347);
  });
});