import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sec()", () => {
  it("should correctly compute secant for a complex number with real part 0.5", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.sec();
    const expectedRe = 0.768941926267439;
    const expectedIm = -0.181269246922018;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});