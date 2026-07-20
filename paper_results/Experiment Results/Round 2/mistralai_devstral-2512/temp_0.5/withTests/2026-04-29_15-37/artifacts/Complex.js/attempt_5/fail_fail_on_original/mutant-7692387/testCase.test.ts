import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh()", () => {
  it("should correctly handle the internal state during asinh computation", () => {
    const c = new Complex(1, 1);
    const originalRe = c.re;
    const originalIm = c.im;
    const result = c.asinh();
    // The mutation changes this['im'] to this[""] which should affect the internal state
    // Verify the original object's state hasn't been corrupted
    expect(c.re).toBe(originalRe);
    expect(c.im).toBe(originalIm);
    // Also verify the result is correct
    expect(result.re).toBeCloseTo(0.6614715217823513, 10);
    expect(result.im).toBeCloseTo(1.0612750619050357, 10);
  });
});