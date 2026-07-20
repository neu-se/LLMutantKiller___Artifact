import { Complex } from "./complex.js";

describe("Complex multiplication with real numbers", () => {
  it("should correctly multiply two real numbers", () => {
    const a = new Complex(3, 0);
    const b = new Complex(4, 0);
    const result = a.mul(b);
    expect(result.re).toBe(12);
    expect(result.im).toBe(0);
  });
});