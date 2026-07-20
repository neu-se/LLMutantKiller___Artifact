import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex constructor with undefined input", () => {
  it("should return a complex number with im=0 when constructed with undefined", () => {
    const c = new Complex(undefined);
    // In mutated code, z['im'] is never explicitly set in the null/undefined branch
    // so we verify the imaginary part is exactly 0
    expect(c.im).toBe(0);
    expect(c.re).toBe(0);
    expect(c.isZero()).toBe(true);
  });
});