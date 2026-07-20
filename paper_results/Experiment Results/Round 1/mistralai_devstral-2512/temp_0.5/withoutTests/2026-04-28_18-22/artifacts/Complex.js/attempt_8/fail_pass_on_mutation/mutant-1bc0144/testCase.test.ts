import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech", () => {
  it("should produce a finite result for valid input", () => {
    const c = new Complex(2, 0);
    const result = c.asech();
    expect(result.isFinite()).toBe(true);
    expect(result.re).toBeGreaterThan(0);
  });
});