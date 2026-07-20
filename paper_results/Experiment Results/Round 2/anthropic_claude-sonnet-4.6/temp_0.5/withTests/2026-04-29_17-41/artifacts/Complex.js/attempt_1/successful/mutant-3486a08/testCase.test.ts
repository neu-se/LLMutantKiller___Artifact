import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex equals method", () => {
  it("should return false when comparing two complex numbers with different real parts", () => {
    const c1 = new Complex(1, 0);
    const c2 = new Complex(2, 0);
    expect(c1.equals(c2)).toBe(false);
  });
});