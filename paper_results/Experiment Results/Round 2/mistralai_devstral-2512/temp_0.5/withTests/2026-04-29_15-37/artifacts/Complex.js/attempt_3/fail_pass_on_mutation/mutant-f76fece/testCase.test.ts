import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.equals", () => {
  it("should return true when comparing two complex numbers with exactly equal imaginary parts", () => {
    const a = new Complex(1, 0.5);
    const b = new Complex(1, 0.5);
    expect(a.equals(b)).toBe(true);
  });
});