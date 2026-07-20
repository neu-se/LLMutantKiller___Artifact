import { Complex } from "./complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse a string with only imaginary part", () => {
    const c = new Complex("i");
    expect(c.re).toBe(0);
    expect(c.im).toBe(1);
  });
});