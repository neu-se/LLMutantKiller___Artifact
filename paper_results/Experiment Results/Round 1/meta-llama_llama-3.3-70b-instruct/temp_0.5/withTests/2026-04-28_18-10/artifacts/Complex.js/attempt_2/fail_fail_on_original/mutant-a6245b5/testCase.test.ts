import { Complex } from "../complex.js";

describe("Complex.js", () => {
  it("should return the correct result for atanh function with b !== 0", () => {
    const complex = new Complex(1, 1);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0.2553419474069725);
    expect(result.im).toBeCloseTo(-1.302425150958581);
  });
});