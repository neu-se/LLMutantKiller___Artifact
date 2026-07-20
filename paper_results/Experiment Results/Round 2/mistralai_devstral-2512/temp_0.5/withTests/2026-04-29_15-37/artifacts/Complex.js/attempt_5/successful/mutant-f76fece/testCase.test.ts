import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.equals", () => {
  it("should return true when comparing complex numbers with imaginary parts differing by exactly EPSILON", () => {
    const a = new Complex(1, 0);
    const b = new Complex(1, Complex.EPSILON);
    expect(a.equals(b)).toBe(true);
  });
});