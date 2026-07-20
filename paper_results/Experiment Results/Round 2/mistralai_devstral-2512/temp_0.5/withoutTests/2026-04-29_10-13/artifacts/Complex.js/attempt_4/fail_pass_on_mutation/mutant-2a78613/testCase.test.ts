import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex multiplication with real numbers", () => {
  it("should return correct result when multiplying two real numbers", () => {
    const a = new Complex(2, 0);
    const b = new Complex(3, 0);
    const result = a.mul(b);
    expect(result.re).toBe(6);
    expect(result.im).toBe(0);
  });
});