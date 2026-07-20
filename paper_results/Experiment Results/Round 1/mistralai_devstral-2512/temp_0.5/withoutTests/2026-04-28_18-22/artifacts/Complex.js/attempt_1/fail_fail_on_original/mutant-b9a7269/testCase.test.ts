import { Complex } from "./complex.js";

describe("Complex.floor", () => {
  it("should correctly floor complex numbers with specified decimal places", () => {
    const c = new Complex(1.2345, 2.3456);
    const result = c.floor(2);
    expect(result.re).toBe(1.23);
    expect(result.im).toBe(2.34);
  });
});