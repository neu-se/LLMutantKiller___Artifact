import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js", () => {
  it("should return the correct result for atanh function with b === 0", () => {
    const complex = new Complex(1, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0.5493061443340548);
    expect(result.im).toBeCloseTo(0);
  });
});