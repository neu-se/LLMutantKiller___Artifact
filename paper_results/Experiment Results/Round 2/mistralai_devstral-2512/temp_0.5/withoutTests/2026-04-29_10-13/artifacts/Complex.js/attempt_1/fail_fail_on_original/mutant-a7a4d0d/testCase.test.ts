import { Complex } from "./complex.js";

describe("Complex.acosh()", () => {
  it("should return correct result for acosh(1)", () => {
    const result = new Complex(1, 0).acosh();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);
  });
});