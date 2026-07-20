import { Complex } from "./complex.js";

describe("Complex.asec()", () => {
  it("should return Infinity when called on zero", () => {
    const zero = new Complex(0, 0);
    const result = zero.asec();
    expect(result.isInfinite()).toBe(true);
  });
});