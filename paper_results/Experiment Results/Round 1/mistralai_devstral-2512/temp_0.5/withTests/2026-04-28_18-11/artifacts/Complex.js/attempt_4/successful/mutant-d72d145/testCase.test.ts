import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should handle division by zero in acsc calculation when a=0", () => {
    const c = new Complex(0, 1);
    const result = c.acsc();
    // With the mutation d = a/a + b*b, when a=0 this becomes NaN, affecting the result
    expect(result.isFinite()).toBe(true);
  });
});