import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow", () => {
  it("should correctly handle non-zero base with zero real and imaginary parts", () => {
    const result = new Complex(2, 3).pow(0, 0);
    expect(result.re).toBe(1);
    expect(result.im).toBe(0);
  });
});