import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh", () => {
  it("should correctly handle the internal state manipulation during asinh computation", () => {
    const c = new Complex(1, 1);
    const originalRe = c.re;
    const originalIm = c.im;
    const result = c.asinh();
    // The mutation changes internal state manipulation, so we verify the result
    // and that the original object's state is preserved correctly
    expect(result.re).toBeCloseTo(0.6421, 4);
    expect(result.im).toBeCloseTo(1.0049, 4);
    // Verify original object wasn't corrupted by the operation
    expect(c.re).toBe(originalRe);
    expect(c.im).toBe(originalIm);
  });
});