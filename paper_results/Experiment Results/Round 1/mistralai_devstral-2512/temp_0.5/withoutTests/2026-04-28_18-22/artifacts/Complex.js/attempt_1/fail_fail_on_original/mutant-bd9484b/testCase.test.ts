import { Complex } from "./complex.js";

describe("Complex.acosh()", () => {
  it("should return correct result for acosh(1)", () => {
    const c = new Complex(1, 0);
    const result = c.acosh();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});