// Test file to detect mutation in Complex.js
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh() mutation test", () => {
  it("should correctly compute asinh of a complex number", () => {
    const c = new Complex(0, 0);
    const result = c.asinh();
    // Expected result for asinh(0 + 0i) should be (0, 0)
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
  });
});