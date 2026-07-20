import { Complex } from "./complex";

describe("Complex number parsing", () => {
  it("should correctly parse scientific notation with two-digit exponents", () => {
    const result = new Complex("1.5e+10");
    expect(result.re).toBe(1.5e+10);
    expect(result.im).toBe(0);
  });
});