import { Complex } from "./complex.js";

describe("Complex.sech() method", () => {
  it("should correctly compute the hyperbolic secant of a complex number", () => {
    const c = new Complex(1, 2);
    const result = c.sech();
    expect(result.re).toBeCloseTo(0.2349002821326327, 10);
    expect(result.im).toBeCloseTo(-0.4284253837694434, 10);
  });
});