import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should handle division by zero correctly for non-zero imaginary input", () => {
    const result = new Complex(0, 1).asec();
    expect(result.isInfinite()).toBe(true);
  });
});