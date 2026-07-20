import { Complex } from "./complex.js";

describe("Complex.js", () => {
  it("should return the correct result for atanh function with b === 0 and pass on the original code, but fail on the mutated code", () => {
    const complex = new Complex(1, 0);
    const result = complex.atanh();
    expect(result.im).not.toBeCloseTo(Infinity);
  });
});