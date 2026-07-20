import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc", () => {
  it("should handle division by zero correctly for zero complex number", () => {
    const c = new Complex(0, 0);
    const result = c.acsc();
    expect(result.isInfinite()).toBe(true);
  });
});