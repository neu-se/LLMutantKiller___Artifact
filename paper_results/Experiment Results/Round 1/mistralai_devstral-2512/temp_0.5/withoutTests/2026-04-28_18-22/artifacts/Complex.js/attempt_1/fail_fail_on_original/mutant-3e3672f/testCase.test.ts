import { Complex } from "./complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers with uppercase 'I'", () => {
    const result = new Complex("1+2I");
    expect(result.re).toBe(1);
    expect(result.im).toBe(2);
  });
});