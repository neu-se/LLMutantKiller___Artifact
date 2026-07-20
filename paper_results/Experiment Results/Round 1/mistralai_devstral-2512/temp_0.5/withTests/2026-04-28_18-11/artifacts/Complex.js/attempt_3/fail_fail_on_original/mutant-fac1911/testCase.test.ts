import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should correctly compute the inverse cosecant for a complex number with non-zero components", () => {
    const c = new Complex(1, 1);
    const result = c.acsc();
    // The mutation changes a*a to a/a in the acsc calculation, which should affect the result
    expect(result.re).toBeCloseTo(0.45227844715119064, 10);
    expect(result.im).toBeCloseTo(-0.45227844715119064, 10);
  });
});