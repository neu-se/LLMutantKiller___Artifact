import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow", () => {
  it("should correctly handle non-zero imaginary part with zero base", () => {
    const result = new Complex(0, 1).pow(0, 0);
    expect(result.re).toBe(1);
    expect(result.im).toBe(0);
  });
});