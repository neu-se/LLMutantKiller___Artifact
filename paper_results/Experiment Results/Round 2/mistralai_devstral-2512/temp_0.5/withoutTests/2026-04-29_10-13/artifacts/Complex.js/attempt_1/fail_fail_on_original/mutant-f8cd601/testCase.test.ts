import { Complex } from "./complex.js";

describe("Complex.csch", () => {
  it("should compute the hyperbolic cosecant of a complex number", () => {
    const c = new Complex(1, 1);
    const result = c.csch();
    expect(result.re).toBeCloseTo(-0.3181315052047641, 10);
    expect(result.im).toBeCloseTo(0.634856231720631, 10);
  });
});