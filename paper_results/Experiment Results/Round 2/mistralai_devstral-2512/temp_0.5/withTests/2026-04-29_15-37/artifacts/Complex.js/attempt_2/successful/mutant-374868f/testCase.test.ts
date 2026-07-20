// Test case to detect the mutation in the asech method
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech method", () => {
  it("should correctly compute the inverse hyperbolic secant of a complex number", () => {
    const c = new Complex(0.5, 0);
    const result = c.asech();
    // Expected result for asech(0.5) should be approximately 1.3169578969248166
    expect(result.re).toBeCloseTo(1.3169578969248166, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});