import { Complex } from "./complex.js";

describe("Complex multiplication", () => {
  it("should correctly multiply two real numbers", () => {
    const a = new Complex(5, 0);
    const b = new Complex(3, 0);
    const result = a.mul(b);
    expect(result.re).toBe(15);
    expect(result.im).toBe(0);
  });
});