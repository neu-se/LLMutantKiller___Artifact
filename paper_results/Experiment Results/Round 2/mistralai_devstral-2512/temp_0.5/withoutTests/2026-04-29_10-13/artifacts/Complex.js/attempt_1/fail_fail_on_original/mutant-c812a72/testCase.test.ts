import { Complex } from "./complex.js";

describe("Complex.round", () => {
  it("should correctly round complex numbers with specified decimal places", () => {
    const c = new Complex(1.2345, 2.3456);
    const rounded = c.round(2);
    expect(rounded.re).toBe(1.23);
    expect(rounded.im).toBe(2.35);
  });
});