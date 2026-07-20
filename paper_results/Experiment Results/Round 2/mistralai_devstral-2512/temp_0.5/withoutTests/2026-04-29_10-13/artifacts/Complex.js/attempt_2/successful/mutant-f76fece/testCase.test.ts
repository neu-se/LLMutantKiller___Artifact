import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.equals", () => {
  it("should return true when comparing complex numbers with equal imaginary parts within epsilon", () => {
    const a = new Complex(1, 1e-15);
    const b = new Complex(1, 0);
    expect(a.equals(b)).toBe(true);
  });
});