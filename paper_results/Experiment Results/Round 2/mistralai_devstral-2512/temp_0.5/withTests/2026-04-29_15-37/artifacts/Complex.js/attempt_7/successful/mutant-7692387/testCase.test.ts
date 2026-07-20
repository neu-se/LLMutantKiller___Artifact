import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh()", () => {
  it("should not corrupt internal state when computing asinh", () => {
    const c = new Complex(2, 3);
    const originalRe = c.re;
    const originalIm = c.im;
    const result = c.asinh();
    // The mutation changes this['im'] to this[""] which will corrupt the state
    // Verify the original object's state is preserved
    expect(c.re).toBe(originalRe);
    expect(c.im).toBe(originalIm);
    // Verify result is a Complex number
    expect(result instanceof Complex).toBe(true);
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
  });
});