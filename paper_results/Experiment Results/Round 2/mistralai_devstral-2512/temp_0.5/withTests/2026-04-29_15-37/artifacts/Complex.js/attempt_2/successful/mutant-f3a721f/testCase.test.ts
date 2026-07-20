import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.equals", () => {
  it("should return true when comparing two equal complex numbers with values exactly at EPSILON boundary", () => {
    const c1 = new Complex(Complex.EPSILON, 0);
    const c2 = new Complex(0, 0);
    expect(c1.equals(c2)).toBe(true);
  });
});