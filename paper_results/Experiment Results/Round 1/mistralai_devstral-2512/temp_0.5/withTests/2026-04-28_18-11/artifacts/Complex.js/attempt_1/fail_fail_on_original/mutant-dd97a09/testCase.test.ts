import { Complex } from "./complex.js";

describe("Complex.sech()", () => {
  it("should compute the hyperbolic secant of a complex number", () => {
    const z = new Complex(1, 1);
    const result = z.sech();
    expect(result.re).toBeCloseTo(0.41997434161402614);
    expect(result.im).toBeCloseTo(-0.41997434161402614);
  });
});