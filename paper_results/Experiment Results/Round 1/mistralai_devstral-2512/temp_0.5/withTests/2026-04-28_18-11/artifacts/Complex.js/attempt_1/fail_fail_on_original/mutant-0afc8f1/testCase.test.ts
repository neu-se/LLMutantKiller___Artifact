import { Complex } from "./complex";

describe("Complex.asech", () => {
  it("should compute the inverse hyperbolic secant of a complex number", () => {
    const c = new Complex(0.5, 0);
    const result = c.asech();
    expect(result.re).toBeCloseTo(Math.acosh(2), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});