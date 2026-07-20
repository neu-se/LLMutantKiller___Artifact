// Test file to detect mutation in Complex.js
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh() mutation test", () => {
  it("should correctly compute asinh of a complex number", () => {
    const c = new Complex(0, 1);
    const result = c.asinh();
    // Expected result for asinh(0 + 1i) should be approximately (0.0, 0.7853981633974483)
    expect(result.re).toBeCloseTo(0.0, 10);
    expect(result.im).toBeCloseTo(0.7853981633974483, 10);
  });
});