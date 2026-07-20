import { Complex } from "./complex.js";

describe("Complex.js", () => {
  it("should return a finite value for atanh function with b === 0 and pass on the original code, but fail on the mutated code", () => {
    const complex = new Complex(1, 0);
    const result = complex.atanh();
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
  });
});