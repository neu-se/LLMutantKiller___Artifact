import { Complex } from "./complex.js";

describe("Complex floor method", () => {
  it("should correctly floor the imaginary part of a complex number", () => {
    const c = new Complex(1.5, 2.7);
    const result = c.floor();
    expect(result.im).toBe(2);
  });
});