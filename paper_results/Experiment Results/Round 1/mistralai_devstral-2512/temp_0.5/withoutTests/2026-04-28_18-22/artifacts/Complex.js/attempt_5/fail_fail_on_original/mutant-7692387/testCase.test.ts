// Test file to detect mutation in Complex.js
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh() mutation test", () => {
  it("should correctly handle complex number state after asinh operation", () => {
    const c = new Complex(1, 1);
    const originalRe = c.re;
    const originalIm = c.im;
    const result = c.asinh();
    // The mutation changes this[""] instead of this['im'], which should affect the internal state
    // After asinh operation, the original object's state should remain unchanged
    expect(c.re).toBe(originalRe);
    expect(c.im).toBe(originalIm);
    // Also verify the result is correct
    expect(result.re).toBeCloseTo(0.634194884846806, 10);
    expect(result.im).toBeCloseTo(1.000245402308525, 10);
  });
});