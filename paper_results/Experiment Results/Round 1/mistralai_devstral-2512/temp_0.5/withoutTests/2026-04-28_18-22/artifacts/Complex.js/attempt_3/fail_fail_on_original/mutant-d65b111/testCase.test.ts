import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech", () => {
  it("should handle division by zero in asech calculation", () => {
    const c = new Complex(0, 1);
    const result = c.asech();
    expect(result.isInfinite()).toBe(true);
  });
});