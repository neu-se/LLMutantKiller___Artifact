import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech", () => {
  it("should correctly compute the inverse hyperbolic secant for a specific complex number", () => {
    const c = new Complex(0.5, 0);
    const result = c.asech();
    const expectedRe = Math.log((1 + Math.sqrt(1 - 0.25)) / 0.5);
    expect(result.re).toBeCloseTo(expectedRe);
    expect(result.im).toBeCloseTo(0);
  });
});