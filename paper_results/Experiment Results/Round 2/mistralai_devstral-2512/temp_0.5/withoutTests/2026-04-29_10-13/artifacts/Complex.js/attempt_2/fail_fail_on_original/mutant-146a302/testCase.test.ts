import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sec()", () => {
  it("should correctly compute secant for a complex number with non-zero real part", () => {
    const c = new Complex(1, 0.5);
    const result = c.sec();
    const expectedRe = 0.6987096304858435;
    const expectedIm = -0.3012903695141565;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});