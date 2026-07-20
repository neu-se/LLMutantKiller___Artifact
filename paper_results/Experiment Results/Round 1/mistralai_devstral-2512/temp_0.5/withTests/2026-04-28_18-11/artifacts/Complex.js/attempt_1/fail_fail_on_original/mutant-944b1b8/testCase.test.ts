import { Complex } from "./complex.js";

describe("Complex.asec()", () => {
  it("should return Infinity for zero input", () => {
    const result = new Complex(0, 0).asec();
    expect(result.isInfinite()).toBe(true);
  });
});