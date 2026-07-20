import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sec()", () => {
  it("should correctly compute secant for a complex number with real part 0.5", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.sec();
    const expectedRe = 0.9499788676154947;
    const expectedIm = 0.23982763093808804;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});