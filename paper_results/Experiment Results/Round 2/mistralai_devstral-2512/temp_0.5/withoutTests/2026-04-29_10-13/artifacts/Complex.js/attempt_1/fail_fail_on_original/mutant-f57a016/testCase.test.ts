// Test case to detect the mutation in complex.js
import { Complex } from "./complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers with imaginary unit 'I'", () => {
    const c = new Complex("1+2I");
    expect(c.re).toBe(1);
    expect(c.im).toBe(2);
  });
});