import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex multiplication edge case", () => {
  it("should handle multiplication of two real numbers correctly", () => {
    const a = new Complex(5, 0);
    const b = new Complex(7, 0);
    const result = a.mul(b);
    expect(result.re).toBe(35);
    expect(result.im).toBe(0);
    expect(result).toBeInstanceOf(Complex);
  });
});