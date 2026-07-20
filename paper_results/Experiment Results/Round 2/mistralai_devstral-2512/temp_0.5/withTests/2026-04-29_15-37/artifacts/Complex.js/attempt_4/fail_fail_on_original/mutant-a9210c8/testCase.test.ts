import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech() method", () => {
  it("should correctly compute the hyperbolic secant of a complex number", () => {
    const c = new Complex(0, 0);
    const result = c.sech();
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(0);
  });
});