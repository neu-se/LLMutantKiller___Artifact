import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.equals", () => {
  it("should return false when comparing different complex numbers", () => {
    const c1 = new Complex(1, 2);
    const c2 = new Complex(1, 3);
    expect(c1.equals(c2)).toBe(false);
  });
});