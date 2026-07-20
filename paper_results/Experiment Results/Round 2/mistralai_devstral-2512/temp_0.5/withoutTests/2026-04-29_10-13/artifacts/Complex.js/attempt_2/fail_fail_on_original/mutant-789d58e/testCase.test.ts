import { Complex } from "./complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute expm1 for small complex numbers", () => {
    const c = new Complex(0.1, 0.1);
    const result = c.expm1();
    const expectedRe = Math.expm1(0.1) * Math.cos(0.1) + (Math.cos(0.1) - 1);
    expect(result.re).toBeCloseTo(expectedRe, 10);
  });
});