import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex inverse", () => {
  it("should handle the inverse of a complex number correctly", () => {
    const c = new Complex(1, 1);
    const result = c.inverse();
    const expected = new Complex(0.5, -0.5);
    expect(result.re).toBeCloseTo(expected.re);
    expect(result.im).toBeCloseTo(expected.im);
  });
});