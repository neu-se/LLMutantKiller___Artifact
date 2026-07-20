import { Complex } from "./complex.js";

describe("Complex.asec", () => {
  it("should return Complex(0, Infinity) when called on Complex(0, 0)", () => {
    const c = new Complex(0, 0);
    const result = c.asec();
    expect(result.re).toBe(0);
    expect(result.im).toBe(Infinity);
  });
});