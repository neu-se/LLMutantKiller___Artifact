import { Complex } from "./complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    const c = new Complex(0.1, 0);
    const result = c.expm1();
    const expectedRe = Math.expm1(0.1) * Math.cos(0) + (Math.cos(0.1) - 1);
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});