import { Complex } from "./complex.js";

describe("Complex acsc", () => {
  it("should handle zero imaginary part correctly", () => {
    const c = new Complex(0, 0);
    const result = c.acsc();
    expect(result.isInfinite()).toBe(true);
  });
});