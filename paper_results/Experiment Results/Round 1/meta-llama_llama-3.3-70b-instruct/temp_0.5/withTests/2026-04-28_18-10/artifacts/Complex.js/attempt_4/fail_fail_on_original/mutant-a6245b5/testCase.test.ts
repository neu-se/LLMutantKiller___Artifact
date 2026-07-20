import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js", () => {
  it("should return the correct result for atanh function with b !== 0 and pass on the original code, but fail on the mutated code", () => {
    const complex = new Complex(0, 1);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(Math.PI / 2);
  });
});