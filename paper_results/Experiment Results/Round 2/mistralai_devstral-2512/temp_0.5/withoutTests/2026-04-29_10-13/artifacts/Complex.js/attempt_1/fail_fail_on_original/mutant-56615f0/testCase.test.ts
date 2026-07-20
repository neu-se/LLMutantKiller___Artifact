import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should correctly compute the inverse hyperbolic cosecant of a real number", () => {
    const c = new Complex(2, 0);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(0.48121182505960347);
    expect(result.im).toBe(0);
  });
});