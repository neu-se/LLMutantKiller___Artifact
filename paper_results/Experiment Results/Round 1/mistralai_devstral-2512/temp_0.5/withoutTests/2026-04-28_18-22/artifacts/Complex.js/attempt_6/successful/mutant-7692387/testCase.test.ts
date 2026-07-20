// Test file to detect mutation in Complex.js
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh() mutation test", () => {
  it("should not modify the original complex number's state", () => {
    const c = new Complex(1, 1);
    const originalRe = c.re;
    const originalIm = c.im;
    c.asinh();
    // The mutation incorrectly modifies this[""] instead of this['im']
    // This test verifies the original object's state remains unchanged
    expect(c.re).toBe(originalRe);
    expect(c.im).toBe(originalIm);
  });
});