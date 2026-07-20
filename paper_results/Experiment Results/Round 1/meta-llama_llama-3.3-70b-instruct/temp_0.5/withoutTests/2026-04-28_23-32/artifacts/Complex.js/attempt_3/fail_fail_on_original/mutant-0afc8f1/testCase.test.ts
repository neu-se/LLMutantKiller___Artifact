import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should calculate the complex arcus hyperbolic secant", () => {
    const c = new Complex(0.5, 0);
    const result = c.asech();
    expect(result.re).toBeCloseTo(0.0, 4);
    expect(result.im).toBeCloseTo(0.0, 4);
  });
});