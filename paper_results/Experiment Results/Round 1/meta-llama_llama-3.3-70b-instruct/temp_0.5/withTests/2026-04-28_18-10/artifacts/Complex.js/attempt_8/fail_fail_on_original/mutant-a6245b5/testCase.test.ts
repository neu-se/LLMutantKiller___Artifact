import { Complex } from "./complex.js";

describe("Complex.js", () => {
  it("should return a finite value for atanh function and pass on the original code, but fail on the mutated code", () => {
    const complex = new Complex(1, 1);
    const result = complex.atanh();
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
    const complex2 = new Complex(0, 1);
    const result2 = complex2.atanh();
    expect(isFinite(result2.re)).toBe(true);
    expect(isFinite(result2.im)).toBe(true);
  });
});