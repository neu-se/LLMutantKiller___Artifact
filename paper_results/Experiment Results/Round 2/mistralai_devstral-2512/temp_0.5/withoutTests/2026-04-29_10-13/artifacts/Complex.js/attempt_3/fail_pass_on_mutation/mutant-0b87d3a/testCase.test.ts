import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc", () => {
  it("should handle zero complex number correctly", () => {
    const c = new Complex(0, 0);
    const result = c.acsc();
    expect(result.isInfinite()).toBe(true);
  });
});