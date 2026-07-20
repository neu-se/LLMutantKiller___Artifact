import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc", () => {
  it("should return a valid complex number for non-zero input", () => {
    const c = new Complex(1, 1);
    const result = c.acsc();
    expect(result.isNaN()).toBe(false);
    expect(result.isInfinite()).toBe(false);
  });
});