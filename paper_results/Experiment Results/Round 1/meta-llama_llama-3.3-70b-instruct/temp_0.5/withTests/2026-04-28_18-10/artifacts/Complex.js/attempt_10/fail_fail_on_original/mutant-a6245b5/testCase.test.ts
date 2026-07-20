import { Complex } from "./complex.js";

describe("Complex.js", () => {
  it("should return the correct result for atanh function and pass on the original code, but fail on the mutated code", () => {
    const complex = new Complex(1, 0);
    const result = complex.atanh();
    expect(result.im).toBeCloseTo(0.5493061443340548);
  });
});