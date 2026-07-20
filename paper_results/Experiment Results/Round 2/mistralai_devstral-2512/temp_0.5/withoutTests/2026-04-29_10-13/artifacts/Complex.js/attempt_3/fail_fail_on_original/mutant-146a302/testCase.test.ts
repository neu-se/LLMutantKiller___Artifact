import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sec()", () => {
  it("should correctly compute secant for a complex number with non-zero real part", () => {
    const c = new Complex(2, 1);
    const result = c.sec();
    const expectedRe = 0.459252687073122;
    const expectedIm = -0.278931804512862;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});