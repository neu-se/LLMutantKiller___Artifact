import { Complex } from "./complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers with leading operators", () => {
    const c = new Complex("+5+3i");
    expect(c.re).toBe(5);
    expect(c.im).toBe(3);
  });
});