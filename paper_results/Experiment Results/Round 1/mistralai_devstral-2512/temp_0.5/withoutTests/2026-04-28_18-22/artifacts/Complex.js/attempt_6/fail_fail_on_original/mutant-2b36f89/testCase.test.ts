import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csc", () => {
  it("should correctly compute the cosecant of a complex number with real part 0.5 and imaginary part 0.1", () => {
    const c = new Complex(0.5, 0.1);
    const result = c.csc();
    const expectedRe = 1.8508;
    const expectedIm = -0.3315;
    expect(result.re).toBeCloseTo(expectedRe, 3);
    expect(result.im).toBeCloseTo(expectedIm, 3);
  });
});