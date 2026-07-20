import { Complex } from "./complex.js";

describe("Complex.acsc", () => {
  it("should return Infinity for zero input", () => {
    const result = new Complex(0, 0).acsc();
    expect(result.isInfinite()).toBe(true);
    expect(result.toString()).toBe("Infinity");
  });
});