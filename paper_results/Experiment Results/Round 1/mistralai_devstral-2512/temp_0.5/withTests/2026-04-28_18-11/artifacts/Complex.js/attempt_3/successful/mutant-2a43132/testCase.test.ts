import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec()", () => {
  it("should handle non-zero complex numbers correctly", () => {
    const c = new Complex(1, 1);
    const result = c.asec();
    expect(result.isNaN()).toBe(false);
    expect(result.isInfinite()).toBe(false);
  });
});