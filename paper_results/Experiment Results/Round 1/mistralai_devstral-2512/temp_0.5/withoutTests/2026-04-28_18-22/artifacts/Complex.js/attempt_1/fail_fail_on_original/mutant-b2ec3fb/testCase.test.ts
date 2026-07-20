import { Complex } from "./complex.js";

describe("Complex floor method", () => {
  it("should correctly floor the real part of a complex number", () => {
    const c = new Complex(3.7, 2.3);
    const result = c.floor(0);
    expect(result.re).toBe(3);
    expect(result.im).toBe(2);
  });
});