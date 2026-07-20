import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js", () => {
  it("should return the correct result for atanh function and pass on the original code, but fail on the mutated code", () => {
    const complex = new Complex(1, 0);
    const result = complex.atanh();
    expect(result.re).not.toBe(Infinity);
    expect(result.im).not.toBe(Infinity);
  });
});