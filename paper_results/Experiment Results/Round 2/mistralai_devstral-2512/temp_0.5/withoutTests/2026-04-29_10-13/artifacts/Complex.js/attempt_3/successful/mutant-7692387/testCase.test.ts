import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh()", () => {
  it("should correctly compute asinh for a complex number and maintain internal state", () => {
    const c = new Complex(1, 2);
    const originalIm = c.im;
    const result = c.asinh();
    // The mutation changes this[""] instead of this["im"], which should affect the internal state
    expect(c.im).toBe(originalIm);
    expect(result.re).toBeDefined();
    expect(result.im).toBeDefined();
  });
});