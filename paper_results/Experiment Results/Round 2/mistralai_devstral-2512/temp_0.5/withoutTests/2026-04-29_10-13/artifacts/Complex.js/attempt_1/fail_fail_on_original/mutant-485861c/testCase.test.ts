import { Complex } from "./complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse null input as zero", () => {
    const result = new Complex(null);
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
  });
});