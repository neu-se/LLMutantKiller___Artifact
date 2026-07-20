import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech", () => {
  it("should compute the inverse hyperbolic secant of a complex number", () => {
    const z = new Complex(0.5, 0);
    const result = z.asech();
    expect(result.re).toBeCloseTo(Math.acosh(2), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});