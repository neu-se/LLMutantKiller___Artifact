import { Complex } from "./complex.js";

describe("Complex.sech", () => {
  it("should correctly compute the hyperbolic secant of a complex number", () => {
    const c = new Complex(1, 1);
    const result = c.sech();
    const expectedRe = 0.4161468365471424;
    const expectedIm = -0.4161468365471424;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});