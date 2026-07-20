import { Complex } from "./complex.js";

describe("Complex.acot", () => {
  it("should compute the arc cotangent of a complex number", () => {
    const c = new Complex(1, 1);
    const result = c.acot();
    expect(result.re).toBeCloseTo(0.402359478108525, 10);
    expect(result.im).toBeCloseTo(-0.553574358897045, 10);
  });
});