import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.equals", () => {
  it("should return false when comparing complex numbers with different real parts", () => {
    const c1 = new Complex(1.000000000000001, 0);
    const c2 = new Complex(1, 0);
    expect(c1.equals(c2)).toBe(false);
  });
});