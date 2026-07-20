import { Complex } from "./complex.js";

describe("Complex.atanh()", () => {
  it("should correctly handle the case where a = -1 and b = 0", () => {
    const c = new Complex(-1, 0);
    const result = c.atanh();
    expect(result.re).toBe(-Infinity);
    expect(result.im).toBe(0);
  });
});