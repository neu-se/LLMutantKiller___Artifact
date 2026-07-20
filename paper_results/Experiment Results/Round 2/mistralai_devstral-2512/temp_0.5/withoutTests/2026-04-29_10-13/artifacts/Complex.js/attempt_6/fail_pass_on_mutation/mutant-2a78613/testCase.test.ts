import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex multiplication with real numbers", () => {
  it("should correctly multiply two real numbers and return a Complex instance", () => {
    const a = new Complex(2.5, 0);
    const b = new Complex(4, 0);
    const result = a.mul(b);
    expect(result.re).toBe(10);
    expect(result.im).toBe(0);
    expect(result).toBeInstanceOf(Complex);
  });
});