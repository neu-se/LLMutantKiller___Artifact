import { Complex } from "./complex.js";

describe("Complex.acsc()", () => {
  it("should handle division by zero correctly for imaginary part", () => {
    const c = new Complex(0, 0);
    const result = c.acsc();
    expect(result.im).toBe(Infinity);
  });
});