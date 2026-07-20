import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should calculate the complex arcus hyperbolic secant", () => {
    const c = new Complex(0.5, 0);
    const result = c.asech();
    expect(result).not.toBeUndefined();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});