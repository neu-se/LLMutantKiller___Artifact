// Test file to detect mutation in Complex.js
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh() mutation test", () => {
  it("should correctly compute asinh of a complex number", () => {
    const c = new Complex(1, 1);
    const result = c.asinh();
    // Expected result calculated from correct implementation
    const expectedRe = 0.634194884846806;
    const expectedIm = 1.000245402308525;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});