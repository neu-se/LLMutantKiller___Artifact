import { Complex } from "./complex.js";

describe("Complex.sech", () => {
  it("should correctly compute the hyperbolic secant of a complex number", () => {
    const c = new Complex(1, 2);
    const result = c.sech();
    expect(result.re).toBeCloseTo(0.2349420342603314, 10);
    expect(result.im).toBeCloseTo(-0.4209978479423234, 10);
  });
});