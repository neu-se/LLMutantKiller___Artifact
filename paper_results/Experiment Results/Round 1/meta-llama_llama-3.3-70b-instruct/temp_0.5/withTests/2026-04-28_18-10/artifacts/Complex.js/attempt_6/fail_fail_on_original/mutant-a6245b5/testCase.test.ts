import { Complex } from "./complex.js";

describe("Complex.js", () => {
  it("should return the correct result for atanh function with b !== 0 and pass on the original code, but fail on the mutated code", () => {
    const complex = new Complex(1, 1);
    const result = complex.atanh();
    expect(result.im).toBeCloseTo(-1.302425150958581);
    const complex2 = new Complex(0, 1);
    const result2 = complex2.atanh();
    expect(result2.im).toBeCloseTo(Math.PI / 2);
  });
});