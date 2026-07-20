import { Complex } from "./complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse a complex number from string", () => {
    const c = new Complex("3+4i");
    expect(c.re).toBe(3);
    expect(c.im).toBe(4);
  });
});