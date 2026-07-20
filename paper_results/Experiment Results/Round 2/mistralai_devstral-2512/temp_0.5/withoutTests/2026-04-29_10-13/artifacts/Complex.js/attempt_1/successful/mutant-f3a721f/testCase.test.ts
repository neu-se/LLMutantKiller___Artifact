import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex equals method", () => {
  it("should return true when comparing equal complex numbers with values exactly at EPSILON boundary", () => {
    const epsilon = Complex['EPSILON'];
    const c1 = new Complex(epsilon, 0);
    const c2 = new Complex(0, 0);
    expect(c1.equals(c2)).toBe(true);
  });
});