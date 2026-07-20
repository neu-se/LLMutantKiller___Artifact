import { Complex } from "./complex.js";

describe("Complex.js cosh function", () => {
  it("should correctly compute cosh for small values near zero", () => {
    const z = new Complex(0.0000001, 0);
    const result = z.cosh();
    expect(result.re).toBeCloseTo(1 - 0.0000001, 6);
    expect(result.im).toBeCloseTo(0, 6);
  });
});