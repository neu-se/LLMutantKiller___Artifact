import { Complex } from "./complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers with alternating signs", () => {
    const c = new Complex("1+2i-3i+4i");
    expect(c.re).toBe(1);
    expect(c.im).toBe(3);
  });
});