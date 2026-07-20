import { Complex } from "./complex";

describe("Complex.asech()", () => {
  it("should correctly compute the inverse hyperbolic secant of a complex number", () => {
    const z = new Complex(0.5, 0);
    const result = z.asech();
    expect(result.re).toBeCloseTo(1.3169578969248166);
    expect(result.im).toBeCloseTo(0);
  });
});